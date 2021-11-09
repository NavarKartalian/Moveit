import { getSession } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';
import { api } from '../services/api';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface challengesContextData {
    level: number;
    curExp: number;
    completedChallenges: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    openModal: boolean;
    activeChallenge: Challenge;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    curExp: number;
    completedChallenges: number;
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [curExp, setCurExp] = useState(rest.curExp ?? 0);
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        async function updateData() {
          const session = await getSession();
          const id = session.userId

          await api.post('updateUser', { id: id, level: level, curExp: curExp, completedChallenges: completedChallenges });
        }

        updateData();
    }, [level, curExp, completedChallenges])

    function levelUp() {
        setLevel(level + 1);
        setOpenModal(true);
        setCurExp(0);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount} xp.`,
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = curExp + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }

        setCurExp(finalExperience);
        setActiveChallenge(null);
        setCompletedChallenges(completedChallenges + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                levelUp,
                curExp,
                completedChallenges,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                experienceToNextLevel,
                openModal
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}

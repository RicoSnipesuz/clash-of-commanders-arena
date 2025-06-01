
import { useState, useEffect } from "react";

interface Match {
  id: string;
  createdBy: string;
  createdByUsername: string;
  gameMode: string;
  inputMethod: string;
  weaponRestriction: string;
  scoreLimit: number;
  timeLimit: number;
  wagerAmount: number;
  type: string;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
  opponent?: string;
  opponentUsername?: string;
}

// Simulate a shared storage by using a global key that all users can access
const SHARED_MATCHES_KEY = 'competecore_all_matches';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMatches();
    // Set up an interval to refresh matches every 5 seconds to see other users' matches
    const interval = setInterval(loadMatches, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMatches = () => {
    const savedMatches = localStorage.getItem(SHARED_MATCHES_KEY);
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
    setIsLoading(false);
  };

  const createMatch = (matchData: Omit<Match, 'id' | 'createdAt' | 'status'>) => {
    const newMatch: Match = {
      ...matchData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'open'
    };

    const currentMatches = JSON.parse(localStorage.getItem(SHARED_MATCHES_KEY) || '[]');
    const updatedMatches = [newMatch, ...currentMatches];
    setMatches(updatedMatches);
    localStorage.setItem(SHARED_MATCHES_KEY, JSON.stringify(updatedMatches));
    
    return newMatch;
  };

  const joinMatch = (matchId: string, userId: string, username: string) => {
    const currentMatches = JSON.parse(localStorage.getItem(SHARED_MATCHES_KEY) || '[]');
    const updatedMatches = currentMatches.map((match: Match) => 
      match.id === matchId 
        ? { ...match, opponent: userId, opponentUsername: username, status: 'in-progress' as const }
        : match
    );
    
    setMatches(updatedMatches);
    localStorage.setItem(SHARED_MATCHES_KEY, JSON.stringify(updatedMatches));
  };

  const getOpenMatches = () => {
    return matches.filter(match => match.status === 'open');
  };

  const getUserMatches = (userId: string) => {
    return matches.filter(match => 
      match.createdBy === userId || match.opponent === userId
    );
  };

  return {
    matches,
    isLoading,
    createMatch,
    joinMatch,
    getOpenMatches,
    getUserMatches,
    loadMatches
  };
};

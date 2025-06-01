
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

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = () => {
    const savedMatches = localStorage.getItem('competecore_matches');
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

    const updatedMatches = [newMatch, ...matches];
    setMatches(updatedMatches);
    localStorage.setItem('competecore_matches', JSON.stringify(updatedMatches));
    
    return newMatch;
  };

  const joinMatch = (matchId: string, userId: string, username: string) => {
    const updatedMatches = matches.map(match => 
      match.id === matchId 
        ? { ...match, opponent: userId, opponentUsername: username, status: 'in-progress' as const }
        : match
    );
    
    setMatches(updatedMatches);
    localStorage.setItem('competecore_matches', JSON.stringify(updatedMatches));
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

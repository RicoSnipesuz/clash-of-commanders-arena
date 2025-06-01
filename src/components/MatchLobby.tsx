import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  DollarSign, 
  Users, 
  Clock, 
  Trophy,
  Gamepad2,
  Monitor,
  Zap
} from "lucide-react";
import { useMatches } from "@/hooks/useMatches";
import { useAuth } from "@/hooks/useAuth";
import MatchJoinDialog from "./MatchJoinDialog";

const MatchLobby = () => {
  const { getOpenMatches, joinMatch } = useMatches();
  const { user } = useAuth();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const openMatches = getOpenMatches();

  const handleJoinClick = (match: any) => {
    setSelectedMatch(match);
    setIsJoinDialogOpen(true);
  };

  const handleJoinMatch = (matchId: string, gameCode: string) => {
    if (!user) return;
    
    console.log(`Joining match ${matchId} with game code: ${gameCode}`);
    joinMatch(matchId, user.id, user.username);
    setIsJoinDialogOpen(false);
    setSelectedMatch(null);
  };

  const getGameModeDisplay = (mode: string) => {
    switch (mode) {
      case 'ffa': return 'Free For All';
      case 'hardpoint': return 'Hardpoint';
      default: return mode;
    }
  };

  const getInputMethodDisplay = (method: string) => {
    switch (method) {
      case 'controller': return 'Controller Only';
      case 'kbm': return 'Keyboard & Mouse';
      case 'cross': return 'Cross-Input';
      default: return method;
    }
  };

  const getInputIcon = (method: string) => {
    switch (method) {
      case 'controller': return <Gamepad2 className="h-4 w-4" />;
      case 'kbm': return <Monitor className="h-4 w-4" />;
      case 'cross': return <Zap className="h-4 w-4" />;
      default: return null;
    }
  };

  const getWeaponDisplay = (restriction: string) => {
    switch (restriction) {
      case 'all': return 'All Weapons';
      case 'snipers': return 'Snipers Only';
      case 'ar': return 'Assault Rifles';
      case 'no-shotguns': return 'No Shotguns';
      case 'no-lmg': return 'No LMGs';
      default: return restriction;
    }
  };

  if (openMatches.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardContent className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Open Matches</h3>
          <p className="text-gray-400">Be the first to create a match!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Available Matches</h2>
          <Badge className="bg-purple-600/20 text-purple-300">
            {openMatches.length} Open
          </Badge>
        </div>

        <div className="grid gap-4">
          {openMatches.map((match) => (
            <Card key={match.id} className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    {match.gameMode === 'ffa' ? (
                      <Users className="mr-2 h-5 w-5 text-purple-400" />
                    ) : (
                      <Target className="mr-2 h-5 w-5 text-orange-400" />
                    )}
                    {getGameModeDisplay(match.gameMode)}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      match.type === "casual" ? "bg-blue-600/20 text-blue-300" :
                      match.type === "wager" ? "bg-green-600/20 text-green-300" :
                      "bg-yellow-600/20 text-yellow-300"
                    }>
                      {match.type === "wager" ? `$${match.wagerAmount}` : match.type}
                    </Badge>
                    {match.type === "wager" && (
                      <DollarSign className="h-4 w-4 text-green-400" />
                    )}
                    {match.type === "ranked" && (
                      <Trophy className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Created by</p>
                    <p className="text-white font-medium">@{match.createdByUsername}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Input Method</p>
                    <div className="flex items-center space-x-1">
                      {getInputIcon(match.inputMethod)}
                      <span className="text-white">{getInputMethodDisplay(match.inputMethod)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">Weapons</p>
                    <p className="text-white">{getWeaponDisplay(match.weaponRestriction)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Limits</p>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-white">{match.scoreLimit} kills, {match.timeLimit}m</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-400">
                    Created {new Date(match.createdAt).toLocaleTimeString()}
                  </p>
                  <Button 
                    onClick={() => handleJoinClick(match)}
                    disabled={match.createdBy === user?.id}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Join Match
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MatchJoinDialog
        isOpen={isJoinDialogOpen}
        onClose={() => {
          setIsJoinDialogOpen(false);
          setSelectedMatch(null);
        }}
        match={selectedMatch}
        onJoin={handleJoinMatch}
      />
    </>
  );
};

export default MatchLobby;

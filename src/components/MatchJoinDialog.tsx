
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Send, 
  Copy, 
  CheckCircle,
  Target,
  Users,
  Clock,
  DollarSign
} from "lucide-react";

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

interface MatchJoinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onJoin: (matchId: string, gameCode: string) => void;
}

const MatchJoinDialog = ({ isOpen, onClose, match, onJoin }: MatchJoinDialogProps) => {
  const [gameCode, setGameCode] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, sender: string, text: string, timestamp: string}>>([]);
  const [isJoining, setIsJoining] = useState(false);

  if (!match) return null;

  const handleJoin = async () => {
    if (!gameCode.trim()) return;
    
    setIsJoining(true);
    // Simulate joining process
    await new Promise(resolve => setTimeout(resolve, 1000));
    onJoin(match.id, gameCode);
    setIsJoining(false);
    onClose();
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const copyMatchId = () => {
    navigator.clipboard.writeText(match.id);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-purple-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Target className="mr-2 h-6 w-6 text-purple-400" />
            Join Match - {getGameModeDisplay(match.gameMode)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Match Details */}
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Match Details</h3>
              <Badge className={
                match.type === "casual" ? "bg-blue-600/20 text-blue-300" :
                match.type === "wager" ? "bg-green-600/20 text-green-300" :
                "bg-yellow-600/20 text-yellow-300"
              }>
                {match.type === "wager" ? `$${match.wagerAmount}` : match.type}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Host</p>
                <p className="text-white font-medium">@{match.createdByUsername}</p>
              </div>
              <div>
                <p className="text-gray-400">Input Method</p>
                <p className="text-white">{getInputMethodDisplay(match.inputMethod)}</p>
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

            <div className="flex items-center justify-between pt-2 border-t border-slate-600">
              <p className="text-xs text-gray-400">Match ID: {match.id}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyMatchId}
                className="text-purple-400 hover:text-purple-300"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy ID
              </Button>
            </div>
          </div>

          {/* Game Code Input */}
          <div className="space-y-3">
            <Label htmlFor="gameCode" className="text-gray-300">
              Enter Game Code (from Call of Duty lobby)
            </Label>
            <Input
              id="gameCode"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              placeholder="e.g. ABC123"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              maxLength={10}
            />
            <p className="text-xs text-gray-400">
              Create a private lobby in Call of Duty and share the game code here
            </p>
          </div>

          {/* Chat Section */}
          <div className="space-y-3">
            <Label className="text-gray-300 flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Host
            </Label>
            
            <div className="bg-slate-700/50 rounded-lg p-3 h-32 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-sm">No messages yet. Say hello to @{match.createdByUsername}!</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{msg.sender}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-white text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-slate-600">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleJoin}
              disabled={!gameCode.trim() || isJoining}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isJoining ? (
                "Joining..."
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Join Match
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchJoinDialog;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  DollarSign, 
  Gamepad2, 
  Monitor, 
  Shield, 
  Users,
  Clock,
  Settings
} from "lucide-react";

const MatchCreator = () => {
  const [matchType, setMatchType] = useState("casual");
  const [wagerAmount, setWagerAmount] = useState([25]);
  const [gameMode, setGameMode] = useState("");
  const [inputMethod, setInputMethod] = useState("");
  const [weaponRestriction, setWeaponRestriction] = useState("");
  const [scoreLimit, setScoreLimit] = useState(50);
  const [timeLimit, setTimeLimit] = useState(10);
  const [ranked, setRanked] = useState(false);

  const handleCreateMatch = () => {
    const matchData = {
      type: matchType,
      wager: matchType === "wager" ? wagerAmount[0] : 0,
      gameMode,
      inputMethod,
      weaponRestriction,
      scoreLimit,
      timeLimit,
      ranked
    };
    console.log("Creating match:", matchData);
    // Here you would typically send this to your backend
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-6 w-6 text-purple-400" />
            Create New Match
          </CardTitle>
          <CardDescription className="text-gray-300">
            Set up your perfect 1v1 match with custom rules
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={matchType} onValueChange={setMatchType} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-purple-800/30">
          <TabsTrigger value="casual" className="data-[state=active]:bg-purple-600">
            <Users className="mr-2 h-4 w-4" />
            Casual
          </TabsTrigger>
          <TabsTrigger value="wager" className="data-[state=active]:bg-purple-600">
            <DollarSign className="mr-2 h-4 w-4" />
            Wager
          </TabsTrigger>
          <TabsTrigger value="ranked" className="data-[state=active]:bg-purple-600">
            <Trophy className="mr-2 h-4 w-4" />
            Ranked
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* Left Column - Match Settings */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-purple-400" />
                  Game Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gameMode" className="text-gray-300">Game Mode</Label>
                  <Select value={gameMode} onValueChange={setGameMode}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select game mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="gunfight">Gunfight</SelectItem>
                      <SelectItem value="tdm">Team Deathmatch</SelectItem>
                      <SelectItem value="hardpoint">Hardpoint</SelectItem>
                      <SelectItem value="snd">Search & Destroy</SelectItem>
                      <SelectItem value="control">Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputMethod" className="text-gray-300">Input Method</Label>
                  <Select value={inputMethod} onValueChange={setInputMethod}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select input method" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="controller">Controller Only</SelectItem>
                      <SelectItem value="kbm">Keyboard & Mouse Only</SelectItem>
                      <SelectItem value="cross">Cross-Input</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weapons" className="text-gray-300">Weapon Restrictions</Label>
                  <Select value={weaponRestriction} onValueChange={setWeaponRestriction}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select weapon rules" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Weapons</SelectItem>
                      <SelectItem value="snipers">Snipers Only</SelectItem>
                      <SelectItem value="ar">Assault Rifles Only</SelectItem>
                      <SelectItem value="no-shotguns">No Shotguns</SelectItem>
                      <SelectItem value="no-lmg">No LMGs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Score Limit</Label>
                    <div className="flex items-center space-x-3">
                      <Slider
                        value={[scoreLimit]}
                        onValueChange={(value) => setScoreLimit(value[0])}
                        max={100}
                        min={10}
                        step={5}
                        className="flex-1"
                      />
                      <Badge className="bg-purple-600/20 text-purple-300">
                        {scoreLimit}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Time Limit (min)</Label>
                    <div className="flex items-center space-x-3">
                      <Slider
                        value={[timeLimit]}
                        onValueChange={(value) => setTimeLimit(value[0])}
                        max={30}
                        min={5}
                        step={1}
                        className="flex-1"
                      />
                      <Badge className="bg-purple-600/20 text-purple-300">
                        {timeLimit}m
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {matchType === "wager" && (
              <Card className="bg-slate-800/50 border-green-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                    Wager Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={wagerAmount}
                        onValueChange={setWagerAmount}
                        max={100}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <Badge className="bg-green-600/20 text-green-300 text-lg px-4">
                        ${wagerAmount[0]}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Both players must confirm the wager before the match begins
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Match Preview & Actions */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Match Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Type</p>
                    <Badge className={
                      matchType === "casual" ? "bg-blue-600/20 text-blue-300" :
                      matchType === "wager" ? "bg-green-600/20 text-green-300" :
                      "bg-yellow-600/20 text-yellow-300"
                    }>
                      {matchType.charAt(0).toUpperCase() + matchType.slice(1)}
                    </Badge>
                  </div>
                  {matchType === "wager" && (
                    <div>
                      <p className="text-gray-400">Wager</p>
                      <p className="text-white font-medium">${wagerAmount[0]}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400">Game Mode</p>
                    <p className="text-white">{gameMode || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Input</p>
                    <p className="text-white">{inputMethod || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Weapons</p>
                    <p className="text-white">{weaponRestriction || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Limits</p>
                    <p className="text-white">{scoreLimit} kills, {timeLimit}min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ranked" className="text-white">Count towards ranking</Label>
                    <Switch
                      id="ranked"
                      checked={ranked}
                      onCheckedChange={setRanked}
                      disabled={matchType === "ranked"}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCreateMatch}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
                    disabled={!gameMode || !inputMethod || !weaponRestriction}
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Create Match
                  </Button>
                  
                  <p className="text-gray-400 text-xs text-center">
                    Match will be posted to the lobby for other players to join
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MatchCreator;

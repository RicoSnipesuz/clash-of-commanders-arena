
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  DollarSign, 
  Gamepad2, 
  Users, 
  Target, 
  LogOut, 
  Plus,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import MatchCreator from "@/components/MatchCreator";
import Leaderboard from "@/components/Leaderboard";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showMatchCreator, setShowMatchCreator] = useState(false);

  // Mock user data
  const userData = {
    username: "ProGamer2024",
    email: "progamer@example.com",
    avatar: "",
    stats: {
      wins: 47,
      losses: 23,
      winRate: 67,
      wagerEarnings: 234.50,
      currentRank: "Gold II",
      elo: 1847
    }
  };

  const recentMatches = [
    { id: 1, opponent: "SniperKing", result: "Win", wager: 25, mode: "Gunfight", date: "2 hours ago" },
    { id: 2, opponent: "QuickScoper", result: "Loss", wager: 15, mode: "TDM", date: "1 day ago" },
    { id: 3, opponent: "RushMaster", result: "Win", wager: 50, mode: "S&D", date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-800/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">CompeteCore</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {userData.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-white font-medium">{userData.username}</p>
                <p className="text-gray-400 text-sm">{userData.stats.currentRank}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Win Rate</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userData.stats.winRate}%</div>
              <Progress value={userData.stats.winRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Wager Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${userData.stats.wagerEarnings}</div>
              <p className="text-xs text-gray-400 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +$45 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current ELO</CardTitle>
              <Target className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userData.stats.elo}</div>
              <Badge className="mt-2 bg-yellow-600/20 text-yellow-300 border-yellow-400">
                {userData.stats.currentRank}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Matches</CardTitle>
              <Gamepad2 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userData.stats.wins + userData.stats.losses}</div>
              <p className="text-xs text-gray-400 mt-1">
                {userData.stats.wins}W / {userData.stats.losses}L
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-purple-800/30">
            <TabsTrigger value="matches" className="data-[state=active]:bg-purple-600">My Matches</TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">Create Match</TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-purple-800/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-purple-400" />
                      Recent Matches
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMatches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Badge 
                              className={match.result === 'Win' ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'}
                            >
                              {match.result}
                            </Badge>
                            <div>
                              <p className="text-white font-medium">vs {match.opponent}</p>
                              <p className="text-gray-400 text-sm">{match.mode} • {match.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">${match.wager}</p>
                            <p className={`text-sm ${match.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>
                              {match.result === 'Win' ? '+' : '-'}${match.wager}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600/50">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Quick Match</CardTitle>
                    <CardDescription className="text-center text-gray-300">
                      Find an opponent instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Users className="mr-2 h-4 w-4" />
                      Find Match
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-purple-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Active Tournaments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-white text-sm font-medium">Weekend Warrior</p>
                        <p className="text-gray-400 text-xs">Prize Pool: $500</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-white text-sm font-medium">Sniper Elite</p>
                        <p className="text-gray-400 text-xs">Prize Pool: $250</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-8">
            <MatchCreator />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-purple-400" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Profile customization coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

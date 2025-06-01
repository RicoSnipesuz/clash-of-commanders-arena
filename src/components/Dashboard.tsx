
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  DollarSign, 
  Users, 
  LogOut,
  Plus,
  Gamepad2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MatchCreator from "./MatchCreator";
import MatchLobby from "./MatchLobby";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("lobby");

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  if (!user) return null;

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
            <div className="text-right">
              <p className="text-white font-medium">@{user.username}</p>
              <p className="text-gray-400 text-sm">
                {user.stats.wins}W - {user.stats.losses}L
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.username}
          </h1>
          <p className="text-gray-300 text-lg">Ready to dominate the competition?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{user.stats.wins}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Target className="mr-2 h-5 w-5 text-red-400" />
                Losses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{user.stats.losses}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">${user.stats.earnings}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Gamepad2 className="mr-2 h-5 w-5 text-purple-400" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                {user.stats.wins + user.stats.losses > 0 
                  ? Math.round((user.stats.wins / (user.stats.wins + user.stats.losses)) * 100)
                  : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-purple-800/30 mb-8">
            <TabsTrigger value="lobby" className="data-[state=active]:bg-purple-600">
              <Users className="mr-2 h-4 w-4" />
              Match Lobby
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Match
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lobby">
            <MatchLobby />
          </TabsContent>

          <TabsContent value="create">
            <MatchCreator onMatchCreated={() => setActiveTab("lobby")} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

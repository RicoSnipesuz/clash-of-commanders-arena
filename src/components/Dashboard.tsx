
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Users, 
  Target, 
  DollarSign, 
  Plus, 
  LogOut,
  User,
  Calendar
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MatchCreator from "./MatchCreator";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout, getAllUsers } = useAuth();
  const allUsers = getAllUsers();

  const handleLogout = () => {
    logout();
  };

  const recentUsers = allUsers
    .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
    .slice(0, 5);

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
            <div className="text-white">
              Welcome, <span className="text-purple-400 font-semibold">{user?.username}</span>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-purple-800/30 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <Trophy className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Match
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
              <Users className="mr-2 h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* User Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-slate-800/50 border-purple-800/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Wins</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-400">{user?.stats.wins || 0}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-800/50 border-purple-800/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Losses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-400">{user?.stats.losses || 0}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-800/50 border-purple-800/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-yellow-400">${user?.stats.earnings || 0}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-800/50 border-purple-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-300">
                      Start competing in Free For All or Hardpoint matches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setActiveTab("create")}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Create Match
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("leaderboard")}
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black h-12"
                    >
                      <Trophy className="mr-2 h-5 w-5" />
                      View Rankings
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Players */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-purple-800/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="mr-2 h-5 w-5 text-purple-400" />
                      Recent Players
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Players who recently joined
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentUsers.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">No players yet</p>
                    ) : (
                      <div className="space-y-3">
                        {recentUsers.map((player) => (
                          <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{player.username}</p>
                                <p className="text-gray-400 text-sm">
                                  {player.stats.wins}W {player.stats.losses}L
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-purple-600/20 text-purple-300">
                              New
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-800/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                      Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">$0.00</div>
                      <p className="text-gray-300 text-sm mb-4">Available Balance</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Add Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <MatchCreator />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="mr-2 h-6 w-6 text-purple-400" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-300 text-sm">Username</label>
                      <div className="mt-1 p-3 bg-slate-700 rounded-md text-white">
                        {user?.username}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Email</label>
                      <div className="mt-1 p-3 bg-slate-700 rounded-md text-white">
                        {user?.email}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Member Since</label>
                      <div className="mt-1 p-3 bg-slate-700 rounded-md text-white flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                        {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "Unknown"}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Win Rate</label>
                      <div className="mt-1 p-3 bg-slate-700 rounded-md text-white">
                        {user?.stats.wins || user?.stats.losses ? 
                          `${Math.round((user.stats.wins / (user.stats.wins + user.stats.losses)) * 100)}%` : 
                          "No matches yet"
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

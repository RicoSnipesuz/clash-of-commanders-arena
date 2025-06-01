
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, DollarSign, TrendingUp, Medal, Crown, Award } from "lucide-react";

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");

  // Mock leaderboard data
  const globalLeaderboard = [
    { rank: 1, username: "SniperGod", elo: 2450, wins: 156, losses: 23, winRate: 87, avatar: "" },
    { rank: 2, username: "QuickScoper", elo: 2389, wins: 143, losses: 31, winRate: 82, avatar: "" },
    { rank: 3, username: "ProPlayer99", elo: 2301, wins: 134, losses: 28, winRate: 83, avatar: "" },
    { rank: 4, username: "RushMaster", elo: 2245, wins: 121, losses: 35, winRate: 78, avatar: "" },
    { rank: 5, username: "TacticalPro", elo: 2198, wins: 115, losses: 29, winRate: 80, avatar: "" },
    { rank: 6, username: "HeadshotKing", elo: 2156, wins: 108, losses: 32, winRate: 77, avatar: "" },
    { rank: 7, username: "EliteGamer", elo: 2134, wins: 102, losses: 28, winRate: 78, avatar: "" },
    { rank: 8, username: "ProGamer2024", elo: 1847, wins: 47, losses: 23, winRate: 67, avatar: "" },
  ];

  const wagerLeaderboard = [
    { rank: 1, username: "MoneyMaker", earnings: 2450.50, matches: 89, avgWager: 27.5, avatar: "" },
    { rank: 2, username: "CashKing", earnings: 1889.25, matches: 67, avgWager: 28.2, avatar: "" },
    { rank: 3, username: "BigBettor", earnings: 1654.75, matches: 45, avgWager: 36.8, avatar: "" },
    { rank: 4, username: "WagerWinner", earnings: 1423.00, matches: 78, avgWager: 18.2, avatar: "" },
    { rank: 5, username: "ProfitPlayer", earnings: 1321.50, matches: 56, avgWager: 23.6, avatar: "" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-400/50 bg-yellow-400/10";
      case 2:
        return "border-gray-400/50 bg-gray-400/10";
      case 3:
        return "border-amber-600/50 bg-amber-600/10";
      default:
        return "border-purple-800/30 bg-slate-800/50";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-purple-800/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                Leaderboards
              </CardTitle>
              <CardDescription className="text-gray-300">
                See where you rank among the best players
              </CardDescription>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-purple-800/30">
          <TabsTrigger value="global" className="data-[state=active]:bg-purple-600">
            <Trophy className="mr-2 h-4 w-4" />
            Global Ranking
          </TabsTrigger>
          <TabsTrigger value="wager" className="data-[state=active]:bg-purple-600">
            <DollarSign className="mr-2 h-4 w-4" />
            Wager Earnings
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="mr-2 h-4 w-4" />
            Monthly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-8">
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Global ELO Rankings</CardTitle>
              <CardDescription className="text-gray-300">
                Based on competitive match performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalLeaderboard.map((player) => (
                  <Card key={player.rank} className={getRankColor(player.rank)}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(player.rank)}
                          </div>
                          <Avatar>
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {player.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-semibold">{player.username}</p>
                            <p className="text-gray-400 text-sm">
                              {player.wins}W / {player.losses}L
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-white font-bold text-lg">{player.elo}</p>
                            <p className="text-gray-400 text-xs">ELO</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold">{player.winRate}%</p>
                            <p className="text-gray-400 text-xs">Win Rate</p>
                          </div>
                          <Badge className="bg-purple-600/20 text-purple-300">
                            {player.rank <= 10 ? "Top 10" : "Rising"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wager" className="mt-8">
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Top Earners</CardTitle>
              <CardDescription className="text-gray-300">
                Players with the highest wager winnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wagerLeaderboard.map((player) => (
                  <Card key={player.rank} className={getRankColor(player.rank)}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(player.rank)}
                          </div>
                          <Avatar>
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback className="bg-green-600 text-white">
                              {player.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-semibold">{player.username}</p>
                            <p className="text-gray-400 text-sm">
                              {player.matches} matches played
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-green-400 font-bold text-lg">${player.earnings}</p>
                            <p className="text-gray-400 text-xs">Total Earnings</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold">${player.avgWager}</p>
                            <p className="text-gray-400 text-xs">Avg Wager</p>
                          </div>
                          <Badge className="bg-green-600/20 text-green-300">
                            High Roller
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-8">
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Champions</CardTitle>
              <CardDescription className="text-gray-300">
                This month's top performers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-gray-400">Monthly leaderboard resets in 12 days</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;

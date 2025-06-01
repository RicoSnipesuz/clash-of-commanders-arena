
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Leaderboard = () => {
  const { getAllUsers } = useAuth();
  const allUsers = getAllUsers();

  // Sort users by wins (you could change this to ELO rating later)
  const topPlayers = allUsers
    .sort((a, b) => {
      const aWinRate = a.stats.wins / Math.max(a.stats.wins + a.stats.losses, 1);
      const bWinRate = b.stats.wins / Math.max(b.stats.wins + b.stats.losses, 1);
      
      // First sort by total wins, then by win rate
      if (a.stats.wins !== b.stats.wins) {
        return b.stats.wins - a.stats.wins;
      }
      return bWinRate - aWinRate;
    })
    .slice(0, 10);

  const topEarners = allUsers
    .sort((a, b) => b.stats.earnings - a.stats.earnings)
    .slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-bold">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-600/20 text-yellow-300 border-yellow-400";
      case 1:
        return "bg-gray-600/20 text-gray-300 border-gray-400";
      case 2:
        return "bg-amber-600/20 text-amber-300 border-amber-400";
      default:
        return "bg-purple-600/20 text-purple-300 border-purple-400";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Trophy className="mr-3 h-10 w-10 text-yellow-400" />
          Leaderboards
        </h1>
        <p className="text-gray-300 text-lg">
          Top players competing in Free For All and Hardpoint matches
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Players by Wins */}
        <Card className="bg-slate-800/50 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-purple-400" />
              Top Players
            </CardTitle>
            <CardDescription className="text-gray-300">
              Ranked by wins and win rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topPlayers.length === 0 ? (
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <p className="text-gray-400">No players yet</p>
                <p className="text-gray-500 text-sm">Be the first to compete!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{player.username}</h3>
                        <p className="text-gray-400 text-sm">
                          {player.stats.wins}W - {player.stats.losses}L
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRankBadge(index)}>
                        {player.stats.wins + player.stats.losses > 0
                          ? `${Math.round((player.stats.wins / (player.stats.wins + player.stats.losses)) * 100)}%`
                          : "0%"
                        } WR
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Earners */}
        <Card className="bg-slate-800/50 border-green-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-green-400" />
              Top Earners
            </CardTitle>
            <CardDescription className="text-gray-300">
              Players with highest earnings from wager matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topEarners.length === 0 || topEarners.every(p => p.stats.earnings === 0) ? (
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <p className="text-gray-400">No earnings yet</p>
                <p className="text-gray-500 text-sm">Start competing in wager matches!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topEarners.filter(p => p.stats.earnings > 0).map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{player.username}</h3>
                        <p className="text-gray-400 text-sm">
                          {player.stats.wins}W - {player.stats.losses}L
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">
                        ${player.stats.earnings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Season Info */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Season 1</CardTitle>
          <CardDescription className="text-gray-300">
            Compete in Free For All and Hardpoint matches to climb the rankings
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300">
            Rankings are based on total wins and win rate. Start competing to see your name here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;

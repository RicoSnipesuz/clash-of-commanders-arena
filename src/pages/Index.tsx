
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Target, Shield, Gamepad2, Monitor, Zap, DollarSign } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-800/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">CompeteCore</h1>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => openAuth('login')}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
            >
              Login
            </Button>
            <Button 
              onClick={() => openAuth('signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-400">
            🔥 The Future of Competitive Gaming
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Compete. 
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Wager.</span>
            <br />Dominate.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate 1v1 matchmaking platform for Call of Duty. No restrictions, full customization, real money on the line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => openAuth('signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Competing
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black text-lg px-8 py-6"
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why CompeteCore?</h2>
          <p className="text-gray-300 text-lg">Unlike other platforms, we give you complete freedom</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
            <CardHeader className="text-center">
              <Gamepad2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Full Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Choose any game mode, weapon restrictions, input method. Your match, your rules.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white">Real Money Wagers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Secure escrow system. Wager $1-$100 per match with instant payouts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-white">Ranked System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                ELO-based ranking with seasonal leaderboards and competitive integrity.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Anti-Cheat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center">
                Advanced dispute system with community verification and admin oversight.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Game Modes */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Supported Game Modes</h2>
          <p className="text-gray-300 text-lg">More freedom than any other platform</p>
        </div>

        <Tabs defaultValue="modes" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-purple-800/30">
            <TabsTrigger value="modes" className="data-[state=active]:bg-purple-600">Game Modes</TabsTrigger>
            <TabsTrigger value="input" className="data-[state=active]:bg-purple-600">Input Methods</TabsTrigger>
            <TabsTrigger value="weapons" className="data-[state=active]:bg-purple-600">Weapon Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modes" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2 h-5 w-5 text-purple-400" />
                    Gunfight
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    2v2 elimination rounds with preset loadouts
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-400" />
                    Team Deathmatch
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Classic TDM with customizable score limits
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Monitor className="mr-2 h-5 w-5 text-purple-400" />
                    Hardpoint
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Control zones with rotating objectives
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-purple-400" />
                    Search & Destroy
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Round-based elimination with bomb objectives
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="input" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-purple-800/30 text-center">
                <CardHeader>
                  <Gamepad2 className="h-12 w-12 text-purple-400 mx-auto" />
                  <CardTitle className="text-white">Controller Only</CardTitle>
                  <CardDescription className="text-gray-300">
                    Console players unite
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30 text-center">
                <CardHeader>
                  <Monitor className="h-12 w-12 text-blue-400 mx-auto" />
                  <CardTitle className="text-white">KBM Only</CardTitle>
                  <CardDescription className="text-gray-300">
                    PC master race
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30 text-center">
                <CardHeader>
                  <Zap className="h-12 w-12 text-green-400 mx-auto" />
                  <CardTitle className="text-white">Cross-Input</CardTitle>
                  <CardDescription className="text-gray-300">
                    True skill test
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weapons" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">All Weapons</CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete freedom - use any weapon in the game
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Snipers Only</CardTitle>
                  <CardDescription className="text-gray-300">
                    Test your precision and quickscoping skills
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">No Shotguns</CardTitle>
                  <CardDescription className="text-gray-300">
                    Keep it competitive with range-based combat
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-slate-800/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Assault Rifles</CardTitle>
                  <CardDescription className="text-gray-300">
                    Classic AR vs AR skill-based matchups
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600/50 text-center">
          <CardHeader className="pb-8">
            <CardTitle className="text-4xl font-bold text-white mb-4">
              Ready to Compete?
            </CardTitle>
            <CardDescription className="text-xl text-gray-300">
              Join thousands of players already earning money through competitive gaming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg" 
              onClick={() => openAuth('signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-12 py-6"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
};

export default Index;

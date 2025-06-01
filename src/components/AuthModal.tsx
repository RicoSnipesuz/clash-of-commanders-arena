
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Mail, Lock, User, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();

  const validateUsername = (username: string): boolean => {
    // Check for invalid characters, fonts, and special symbols
    const invalidPattern = /[^\w\-_.]/;
    const fontPattern = /[\u{1F100}-\u{1F1FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    
    return !invalidPattern.test(username) && !fontPattern.test(username) && username.length >= 3 && username.length <= 20;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (mode === 'signup') {
      if (!validateUsername(username)) {
        setError("Username must be 3-20 characters and contain only letters, numbers, hyphens, underscores, and periods");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }
      
      const result = await signup(email, password, username);
      if (result.success) {
        onSuccess();
        onClose();
        // Reset form
        setEmail("");
        setPassword("");
        setUsername("");
        setConfirmPassword("");
        // Refresh page
        window.location.reload();
      } else {
        setError(result.error || "Signup failed");
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        onSuccess();
        onClose();
        // Reset form
        setEmail("");
        setPassword("");
        // Refresh page
        window.location.reload();
      } else {
        setError(result.error || "Login failed");
      }
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setError("");
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-purple-800/30">
        <DialogHeader>
          <DialogTitle className="text-white text-center flex items-center justify-center">
            <Gamepad2 className="mr-2 h-6 w-6 text-purple-400" />
            {mode === 'login' ? 'Welcome Back' : 'Join CompeteCore'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={mode} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-purple-600">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600">Sign Up</TabsTrigger>
          </TabsList>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <TabsContent value="login">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white text-center">Login to Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white text-center">Create Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300 flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300 flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300 flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-300 flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

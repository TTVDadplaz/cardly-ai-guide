
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Eye, Edit, Share, BarChart3, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards] = useState([
    {
      id: 1,
      name: "John Smith",
      title: "Senior Product Designer",
      company: "TechCorp Solutions",
      views: 45,
      shares: 12
    }
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCreateCard = () => {
    navigate("/card-builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">CardCraft</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your digital business cards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <CreditCard className="w-8 h-8 text-brand-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Shares</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Share className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">26%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Cards Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Cards</h2>
          <Button onClick={handleCreateCard} className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create New Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold">
                  JS
                </div>
                <h3 className="text-lg font-semibold text-center">{card.name}</h3>
                <p className="text-sm text-center opacity-90">{card.title}</p>
                <p className="text-xs text-center opacity-75">{card.company}</p>
              </div>
              <div className="p-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{card.views} views</span>
                  <span>{card.shares} shares</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

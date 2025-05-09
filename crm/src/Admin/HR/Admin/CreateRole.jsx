import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import Nav from "../../Nav";

export default function CreateRole() {
  return (
    <div className="min-h-screen bg-black lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Create New Role</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Role Name</Label>
                      <Input 
                        className="bg-gray-900/50 border-gray-700 text-white"
                        placeholder="Enter role name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Department</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Role Description</Label>
                    <Textarea 
                      className="bg-gray-900/50 border-gray-700 text-white h-32"
                      placeholder="Describe the role responsibilities and expectations..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Required Skills</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['Technical Leadership', 'Project Management', 'Team Collaboration'].map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-900/50 p-3 rounded-lg">
                          <input 
                            type="checkbox" 
                            className="form-checkbox text-purple-500 bg-gray-700 border-gray-600 rounded"
                          />
                          <span className="text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Key Responsibilities</Label>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <Input
                          key={item}
                          className="bg-gray-900/50 border-gray-700 text-white"
                          placeholder={`Responsibility ${item}`}
                        />
                      ))}
                      <Button 
                        variant="outline" 
                        className="text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
                      >
                        + Add Responsibility
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Experience Level</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Budget Range</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          className="bg-gray-900/50 border-gray-700 text-white"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                          type="number"
                          className="bg-gray-900/50 border-gray-700 text-white"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Create Role
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
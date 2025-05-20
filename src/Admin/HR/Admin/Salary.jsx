import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Nav from "../../Nav";

// ...existing code...
export default function ConfigPage() {
  return (
    <div className="min-h-screen  lg:ml-64">
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
            className="space-y-8 max-w-4xl mx-auto"
          >
            {/* Salary Structure Card */}
            <Card className=" bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white"> {/* keep white for title for contrast */}
                  Salary Structure Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-black">Base Salary</Label>
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Enter base salary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Bonus Percentage</Label>
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Enter bonus %"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Tax Deduction</Label>
                      <Select>
                        <SelectTrigger className=" text-black">
                          <SelectValue placeholder="Select tax regime" />
                        </SelectTrigger>
                        <SelectContent className=" text-black">
                          <SelectItem value="new">New Tax Regime</SelectItem>
                          <SelectItem value="old">Old Tax Regime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black">Allowances</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["HRA", "Travel", "Medical"].map((allowance, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg"
                        >
                          <Input
                            type="number"
                            className=" text-black flex-1"
                            placeholder={`${allowance} Amount`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Leave Policy Card */}
            <Card className=" bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Leave Policy Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-black">Annual Leave Days</Label>
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Enter days"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Sick Leave Days</Label>
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Enter days"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black">Leave Accrual Rate</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Accrual rate"
                      />
                      <span className="text-gray-400">days per month</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black">Leave Carry Forward</Label>
                    <Select>
                      <SelectTrigger className=" text-black">
                        <SelectValue placeholder="Select carry forward policy" />
                      </SelectTrigger>
                      <SelectContent className=" text-black">
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                        <SelectItem value="limited">
                          Limited Carry Forward
                        </SelectItem>
                        <SelectItem value="none">No Carry Forward</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Policy Card */}
            <Card className=" bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Attendance Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-black">Working Hours</Label>
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          className=" text-black"
                        />
                        <Input
                          type="time"
                          className=" text-black"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Late Penalty</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          className=" text-black"
                          placeholder="Grace period (mins)"
                        />
                        <Input
                          type="number"
                          className=" text-black"
                          placeholder="Penalty amount"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black">Remote Work Policy</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-purple-500   cursor-pointer"
                        />
                        <span className="text-black">Allow Remote Work</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-purple-500   cursor-pointer"
                        />
                        <span className="text-black">Hybrid Model</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-black">Overtime Policy</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        type="number"
                        className=" text-black"
                        placeholder="Overtime rate multiplier"
                      />
                      <Select>
                        <SelectTrigger className=" text-black">
                          <SelectValue placeholder="Overtime calculation basis" />
                        </SelectTrigger>
                        <SelectContent className=" text-black">
                          <SelectItem value="daily">Daily Basis</SelectItem>
                          <SelectItem value="weekly">Weekly Basis</SelectItem>
                          <SelectItem value="monthly">Monthly Basis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Save Configuration
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...

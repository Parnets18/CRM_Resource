import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Nav from "../../Nav";

export default function RolesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Senior Frontend Developer",
      department: "Engineering",
      experienceLevel: "Senior Level",
      budgetRange: "$80,000 - $120,000",
      skills: ["React", "TypeScript", "CSS"],
      responsibilities: [
        "Lead frontend development",
        "Mentor junior developers",
      ],
      description:
        "Lead frontend development initiatives and mentor team members",
    },
    {
      id: 2,
      name: "Product Manager",
      department: "Product",
      experienceLevel: "Mid Level",
      budgetRange: "$70,000 - $100,000",
      skills: ["Product Strategy", "Analytics", "Communication"],
      responsibilities: ["Define product roadmap", "Coordinate with teams"],
      description:
        "Drive product strategy and coordinate cross-functional teams",
    },
    {
      id: 3,
      name: "Marketing Specialist",
      department: "Marketing",
      experienceLevel: "Entry Level",
      budgetRange: "$45,000 - $65,000",
      skills: ["Digital Marketing", "Content Creation", "SEO"],
      responsibilities: ["Create marketing campaigns", "Manage social media"],
      description: "Execute marketing campaigns and manage digital presence",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    description: "",
    skills: [],
    responsibilities: ["", "", ""],
    experienceLevel: "",
    budgetMin: "",
    budgetMax: "",
  });

  // For Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    department: "",
    description: "",
    skills: [],
    responsibilities: ["", "", ""],
    experienceLevel: "",
    budgetMin: "",
    budgetMax: "",
  });

  // For View Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewRole, setViewRole] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    const newRole = {
      id: roles.length + 1,
      name: formData.name,
      department: formData.department,
      experienceLevel: formData.experienceLevel,
      budgetRange: `$${formData.budgetMin} - $${formData.budgetMax}`,
      skills: formData.skills,
      responsibilities: formData.responsibilities.filter(
        (r) => r.trim() !== ""
      ),
      description: formData.description,
    };

    setRoles((prev) => [...prev, newRole]);
    setIsModalOpen(false);

    // Reset form
    setFormData({
      name: "",
      department: "",
      description: "",
      skills: [],
      responsibilities: ["", "", ""],
      experienceLevel: "",
      budgetMin: "",
      budgetMax: "",
    });
  };

  // Edit Modal Handlers
  const openEditModal = (role, idx) => {
    setEditIndex(idx);
    // Parse budget range for min/max
    let [budgetMin, budgetMax] = ["", ""];
    if (role.budgetRange) {
      const match = role.budgetRange.match(/\$([\d,]+)\s*-\s*\$([\d,]+)/);
      if (match) {
        budgetMin = match[1].replace(/,/g, "");
        budgetMax = match[2].replace(/,/g, "");
      }
    }
    setEditFormData({
      name: role.name,
      department: role.department,
      description: role.description,
      skills: role.skills,
      responsibilities: [
        ...role.responsibilities,
        ...Array(3 - role.responsibilities.length).fill(""),
      ].slice(0, 3),
      experienceLevel: role.experienceLevel,
      budgetMin,
      budgetMax,
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditResponsibilityChange = (index, value) => {
    const newResponsibilities = [...editFormData.responsibilities];
    newResponsibilities[index] = value;
    setEditFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const handleEditSkillToggle = (skill) => {
    setEditFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleEditSubmit = () => {
    const updatedRole = {
      ...roles[editIndex],
      name: editFormData.name,
      department: editFormData.department,
      experienceLevel: editFormData.experienceLevel,
      budgetRange: `$${editFormData.budgetMin} - $${editFormData.budgetMax}`,
      skills: editFormData.skills,
      responsibilities: editFormData.responsibilities.filter(
        (r) => r.trim() !== ""
      ),
      description: editFormData.description,
    };
    const updatedRoles = [...roles];
    updatedRoles[editIndex] = updatedRole;
    setRoles(updatedRoles);
    setIsEditModalOpen(false);
  };

  // View Modal Handlers
  const openViewModal = (role) => {
    setViewRole(role);
    setIsViewModalOpen(true);
  };

  const skillOptions = [
    "Technical Leadership",
    "Project Management",
    "Team Collaboration",
    "React",
    "TypeScript",
    "CSS",
    "Product Strategy",
    "Analytics",
    "Communication",
    "Digital Marketing",
    "Content Creation",
    "SEO",
  ];

  return (
    <div className="min-h-screen lg:ml-64">
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold  mb-2">Roles Management</h1>
                <p>Manage and organize company roles</p>
              </div>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Role
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                      Create New Role
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-700">Role Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter role name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) =>
                            handleInputChange("department", value)
                          }
                        >
                          <SelectTrigger className="text-gray-700">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="Product">Product</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Human Resources">
                              Human Resources
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">Role Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Describe the role responsibilities and expectations..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">Required Skills</Label>
                      <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                        {skillOptions.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                          >
                            <input
                              type="checkbox"
                              checked={formData.skills.includes(skill)}
                              onChange={() => handleSkillToggle(skill)}
                              className="form-checkbox text-purple-500 cursor-pointer"
                            />
                            <span className="text-gray-700 text-sm">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">
                        Key Responsibilities
                      </Label>
                      <div className="space-y-3">
                        {formData.responsibilities.map(
                          (responsibility, index) => (
                            <Input
                              key={index}
                              value={responsibility}
                              onChange={(e) =>
                                handleResponsibilityChange(
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder={`Responsibility ${index + 1}`}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-700">
                          Experience Level
                        </Label>
                        <Select
                          value={formData.experienceLevel}
                          onValueChange={(value) =>
                            handleInputChange("experienceLevel", value)
                          }
                        >
                          <SelectTrigger className="text-gray-700">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Entry Level">
                              Entry Level
                            </SelectItem>
                            <SelectItem value="Mid Level">Mid Level</SelectItem>
                            <SelectItem value="Senior Level">
                              Senior Level
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700">Budget Range</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={formData.budgetMin}
                            onChange={(e) =>
                              handleInputChange("budgetMin", e.target.value)
                            }
                            placeholder="Min"
                          />
                          <span className="text-gray-400">-</span>
                          <Input
                            type="number"
                            value={formData.budgetMax}
                            onChange={(e) =>
                              handleInputChange("budgetMax", e.target.value)
                            }
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Create Role
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    Edit Role
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Role Name</Label>
                      <Input
                        value={editFormData.name}
                        onChange={(e) =>
                          handleEditInputChange("name", e.target.value)
                        }
                        placeholder="Enter role name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Department</Label>
                      <Select
                        value={editFormData.department}
                        onValueChange={(value) =>
                          handleEditInputChange("department", value)
                        }
                      >
                        <SelectTrigger className="text-gray-700">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Human Resources">
                            Human Resources
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Role Description</Label>
                    <Textarea
                      value={editFormData.description}
                      onChange={(e) =>
                        handleEditInputChange("description", e.target.value)
                      }
                      placeholder="Describe the role responsibilities and expectations..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Required Skills</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                      {skillOptions.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            checked={editFormData.skills.includes(skill)}
                            onChange={() => handleEditSkillToggle(skill)}
                            className="form-checkbox text-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-700 text-sm">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Key Responsibilities
                    </Label>
                    <div className="space-y-3">
                      {editFormData.responsibilities.map(
                        (responsibility, index) => (
                          <Input
                            key={index}
                            value={responsibility}
                            onChange={(e) =>
                              handleEditResponsibilityChange(
                                index,
                                e.target.value
                              )
                            }
                            placeholder={`Responsibility ${index + 1}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Experience Level</Label>
                      <Select
                        value={editFormData.experienceLevel}
                        onValueChange={(value) =>
                          handleEditInputChange("experienceLevel", value)
                        }
                      >
                        <SelectTrigger className="text-gray-700">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry Level">
                            Entry Level
                          </SelectItem>
                          <SelectItem value="Mid Level">Mid Level</SelectItem>
                          <SelectItem value="Senior Level">
                            Senior Level
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Budget Range</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={editFormData.budgetMin}
                          onChange={(e) =>
                            handleEditInputChange("budgetMin", e.target.value)
                          }
                          placeholder="Min"
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                          type="number"
                          value={editFormData.budgetMax}
                          onChange={(e) =>
                            handleEditInputChange("budgetMax", e.target.value)
                          }
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleEditSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* View Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    Role Details
                  </DialogTitle>
                </DialogHeader>
                {viewRole && (
                  <div className="space-y-4 mt-2">
                    <div>
                      <span className="font-semibold text-gray-700">
                        Name:{" "}
                      </span>
                      <span>{viewRole.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Department:{" "}
                      </span>
                      <span>{viewRole.department}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Experience Level:{" "}
                      </span>
                      <span>{viewRole.experienceLevel}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Budget Range:{" "}
                      </span>
                      <span>{viewRole.budgetRange}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Description:{" "}
                      </span>
                      <span>{viewRole.description}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Skills:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {viewRole.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Responsibilities:{" "}
                      </span>
                      <ul className="list-disc ml-6 mt-1">
                        {viewRole.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  All Roles ({roles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Role Name
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Department
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Experience
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Budget Range
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Skills
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role, idx) => (
                        <motion.tr
                          key={role.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {role.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {role.description}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {role.department}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={`${
                                role.experienceLevel === "Senior Level"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : role.experienceLevel === "Mid Level"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }`}
                            >
                              {role.experienceLevel}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-gray-900 font-medium">
                              {role.budgetRange}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {role.skills.slice(0, 3).map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs bg-gray-100 text-gray-700"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {role.skills.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gray-100 text-gray-700"
                                >
                                  +{role.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => openViewModal(role)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => openEditModal(role, idx)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
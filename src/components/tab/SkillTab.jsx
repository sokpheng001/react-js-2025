import React, { useState } from "react";

const SkillTab = () => {
  const [activeSkill, setActiveSkill] = useState("listening");

  const skills = [
    {
      id: "listening",
      title: "Listening",
      description:
        "Here you can find activities to practise your listening skills. Listening will help you to improve your understanding of the language and your pronunciation.",
      icon: "🎧",
      color: "bg-indigo-100 border-indigo-500",
      textColor: "text-indigo-800",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      id: "reading",
      title: "Reading",
      description:
        "Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary.",
      icon: "📚",
      color: "bg-blue-100 border-blue-500",
      textColor: "text-blue-800",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "writing",
      title: "Writing",
      description:
        "Here you can find activities to practise your writing skills. You can improve your writing by understanding model texts and how they're structured.",
      icon: "✏️",
      color: "bg-green-100 border-green-500",
      textColor: "text-green-800",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "speaking",
      title: "Speaking",
      description:
        "Here you can find activities to practise your speaking skills. You can improve your speaking by noticing the language we use in different situations and practising useful phrases.",
      icon: "🗣️",
      color: "bg-amber-100 border-amber-500",
      textColor: "text-amber-800",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
  ];

  const activeSkillData = skills.find((skill) => skill.id === activeSkill);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">
        Improve Your Language Skills
      </h1>

      {/* Skills Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => setActiveSkill(skill.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeSkill === skill.id
                ? `${skill.color} border-solid shadow-md`
                : "bg-gray-50 border-gray-200 border-dashed"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">{skill.icon}</span>
              <span
                className={`font-semibold ${
                  activeSkill === skill.id ? skill.textColor : "text-gray-600"
                }`}
              >
                {skill.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Skill Content */}
      <div className={`p-6 rounded-xl border-2 ${activeSkillData.color} mb-8`}>
        <div className="md:flex items-start">
          <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl bg-white shadow-inner">
              {activeSkillData.icon}
            </div>
          </div>
          <div className="md:w-2/3">
            <h2
              className={`text-2xl font-bold mb-4 ${activeSkillData.textColor}`}
            >
              {activeSkillData.title}
            </h2>
            <p className="text-gray-700 mb-6">{activeSkillData.description}</p>
            <button
              className={`${activeSkillData.buttonColor} text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105`}
            >
              Explore {activeSkillData.title} Activities
            </button>
          </div>
        </div>
      </div>

      {/* Featured Activities Preview */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Featured {activeSkillData.title} Activities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-400">
                Activity Preview
              </div>
              <h4 className="font-medium mb-1">Activity {item}</h4>
              <p className="text-sm text-gray-600">
                Practice your {activeSkillData.title.toLowerCase()} skills with
                this engaging activity
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Beginner
                </span>
                <button className="text-sm text-indigo-600 hover:underline">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTab;

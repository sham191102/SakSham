const categories = {
  Road: ["pothole","road","bridge","road damage"],
  Garbage: ["garbage","trash","waste","dirty"],
  Water: ["water","pipeline","leak","no water"],
  Electricity: ["electricity","power cut","street light"],
  Drainage: ["drain","sewer","drainage"]
};

const severityWords = {
  High: ["danger","accident","flood","urgent"],
  Medium: ["big","serious","major"],
  Low: ["small","minor"]
};

export function analyzeComplaint(text){

 text = text.toLowerCase();

 let category="Other";
 let severity="Low";
 let score=0;

 Object.keys(categories).forEach(cat=>{
  categories[cat].forEach(word=>{
   if(text.includes(word)){
    category=cat;
    score++;
   }
  });
 });

 Object.keys(severityWords).forEach(level=>{
  severityWords[level].forEach(word=>{
   if(text.includes(word)){
    severity=level;
   }
  });
 });

 const probability = score/5;

 return{
  category,
  severity,
  probability
 };

}
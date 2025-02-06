const jsonString = '{"name": "Jasper B. Ajias", "age": 22, "hobbies": ["programming", "playing piano", "art"]}';

const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);
console.log(jsonObject.age); 

const newJsonString = JSON.stringify(jsonObject);
console.log(newJsonString); 
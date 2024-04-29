const data = {
  getData() {
    const records = [];
    for (let i = 0; i < 60; i++) {
      const id = `ST${10000 + i}`;
      const name = `Name ${i + 1}`;
      const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18; // Random age between 18-65
      const gender = Math.random() < 0.5 ? "male" : "female";
      const category = ["Category A", "Category B", "Category C"][
        Math.floor(Math.random() * 3)
      ];
      const level = ["I", "II", "III"][Math.floor(Math.random() * 3)];
      const location = `Location ${Math.floor(Math.random() * 5) + 1}`;
      const contactNumber =
        Math.floor(Math.random() * 10000000000) + 10000000000; // Random 11 digit number

      records.push({
        id,
        name,
        age,
        gender,
        category,
        location,
        contactNumber,
        level,
      });
    }
    return records;
  },
  getTasks() {
    return Promise.resolve(this.getData());
  },
};

export default data;

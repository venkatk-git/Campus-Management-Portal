const facultyFormValidate = (name, age, gender, details, contact) => {
  let errorNote = [];
  if (!name || name.value == undefined) errorNote.push("name");
  if (!age || age.value == undefined) errorNote.push("age");
  if (!gender || gender.value == undefined) errorNote.push("gender");
  if (!details || details.value == undefined) errorNote.push("details");
  if (!contact || contact.value == undefined) errorNote.push("contact");
  return errorNote;
};

export default facultyFormValidate;

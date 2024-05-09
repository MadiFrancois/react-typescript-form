import * as yup from "yup";


export const userValidationSchema = yup.object({
  name: yup.string().required("Veillez saisir le nom de l'utilisateur"),
  age: yup.number()
    .min(10,"Vous êtes trop jeune pour utiliser cette application")
    .max(50, "Vous êtes trop vieux pour utiliser cette application"),
});


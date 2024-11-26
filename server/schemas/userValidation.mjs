export const userValidator = {
  fullName: {
    notEmpty: true,
    errorMessage: 'Entrez votre nom svp!',
  },
  email: {
    notEmpty: true,
    errorMessage: 'Entrez votre email svp!',
  },

  country: {
    notEmpty: true,
    errorMessage: 'Entrez votre pays svp!',
  },
  job: {
    escape: true,
    errorMessage: 'Entrez votre occupation svp!',
  },
}

export function validationSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((e) => e.message);
      console.log(errorMessages);
      return res.status(422).send(errorMessages);
    }

    next();
  };
}

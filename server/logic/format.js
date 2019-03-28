exports.data = data => {
  return {
    question: data.question,
    answers: data.answers.map(answer => {
      return {
        answer,
        count: 0
      }
    }),
    total: 0
  }
}

route.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ error: true, message: 'Usuário não encontrado' })
    }

    if (user.password !== password) {
      return res.json({ error: true, message: 'Senha incorreta' })
    }

    res.json({ error: false, user })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})
import { magic } from '@lib/vendor/magic'
import { setLoginSession } from '@lib/vendor/auth'

export default async function login (req, res) {
  try {
    const didToken = req.headers.authorization.substr(7)
    const metadata = await magic.users.getMetadataByToken(didToken)
    const session = { ...metadata }
    await setLoginSession(res, session)
    res.status(200).send(session)
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).end(error.message)
  }
}

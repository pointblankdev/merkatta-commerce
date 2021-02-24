import { createUser, createVendor, getLoginSession } from '@lib/vendor/auth'
import { magic } from '@lib/vendor/magic'

export default async function register (req, res) {
  try {
    console.log('creating new merkatta vendor...')
    const { id } = await createVendor(req.body)
    const didToken = req.headers.authorization.substr(7)
    const metadata = await magic.users.getMetadataByToken(didToken)
    await createUser(metadata, id)
    res.status(200).send({ done: true })
  } catch (e) {
    console.log(e)
    res.status(e.status || 500).end(e.message)
  }
}

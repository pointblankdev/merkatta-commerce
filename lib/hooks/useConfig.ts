import { proxy, useProxy } from 'valtio'

/** Only use tweaks in dev environment */

/**
 * Set default configuration parameters
 */
const config = proxy({})

if (process.env.DAT_GUI_ENABLED) {
  const dat = require('dat.gui')
  /**
   * dat.gui for finding best performance configuration
   */
  const gui = new dat.GUI({ width: 400, closed: true })
}

const useConfig = () => useProxy(config)

export default useConfig

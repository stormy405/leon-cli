import waitOn from 'wait-on'
import execa from 'execa'

export const test3Start = (): void => {
  const PORT = 1340

  test('leon start', (done) => {
    let startSubprocess: execa.ExecaChildProcess<string> | null = null
    startSubprocess = execa('leon', ['start', `--port=${PORT}`])
    waitOn({
      resources: [`http-get://localhost:${PORT}/`],
      delay: 1000,
      timeout: 480_000
    })
      .then(() => {
        console.log(`Success: Leon is running on http://localhost:${PORT}/`)
        expect(startSubprocess?.kill('SIGINT')).toBe(true)
        done()
      })
      .catch((error) => {
        expect(startSubprocess?.kill('SIGINT')).toBe(true)
        done(error)
      })
  })
}

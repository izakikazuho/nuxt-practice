export default function(req, res, next) {
  // req は Node.js の HTTPリクエストオブジェクトです
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello, you are marvelous guy.\n')
  res.end()

  console.log('実行されたやで')
  // res は Node.js の HTTPレスポンスオブジェクトです

  // next は 次のミドルウェアを呼び出すための関数です。
  // あなたのミドルウェアが最後でない場合、関数の最後で next を呼び出すのを忘れないでください！
  next()
}

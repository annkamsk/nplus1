
export function generateLyricsExcerpt(node) {
  const title = node.headings[0].value
  const children = node.excerptAst["children"]

  const dfs = root => {
    if (root.type === "text") {
      return root.value
    }
    return root.children
      .map(child => dfs(child))
      .filter(text => text && text.length > 0)
      .flat()
  }
  // Find 1st paragraph in text
  const par = children.find(n => n.tagName === "p")
  // Find all of its leaves
  const desc = dfs(par)
  const results = new Map()
  // Match keys with values
  for (let i = 0; i < desc.length - 1; ++i) {
    if (desc[i].trim() === ":") {
      // A line in an AST is of form: "key" ":" "value"
      results.set(desc[i - 1].toLowerCase(), desc[i + 1])
    } else if (desc[i].trim().endsWith(":")) {
      // A line in an AST is of form "key:" "value"
      results.set(desc[i].slice(0, -1).toLowerCase(), desc[i + 1])
    } else if (desc[i].includes(":")) {
      const entry = desc[i].split(":")
      const key = entry[0].trim().toLowerCase()
      const val = entry[1].trim()
      results.set(key, val)
    }
  }

  return {
    "title": title,
    "desc": excerptToString(translateExcerpt(results))
  }
}

function translateExcerpt(excerpt) {
  const translated = new Map()
  excerpt.forEach((value, key) => {
    if (["musical", "from", "z"].includes(key)) {
      translated.set("Musical", value)
    } else if (["song", "title", "original title", "tytuł"].includes(key)) {
      translated.set("Oryginalny tytuł", value)
    } else if (["lyrics", "by", "lyrics by", "author", "authors", "copyright", "lyrics and music", "słowa"].includes(key)) {
      translated.set("Słowa", value)
    } else if (["tłumaczenie", "translation", "translated by"].includes(key)) {
      translated.set("Tłumaczenie", value)
    }
  })
  return translated
}

function excerptToString(excerpt) {
  return Array.from(excerpt)
    .map(([key, val]) => `${key}: ${val}\n`)
    .reduce((a, b) => a + b, "")
}

export function splitIntoPolishAndOriginalLyrics(node) {
  const html = node.html

  const titleIdx = html.indexOf("<h3>")
  const englishIdx = html.indexOf("<h3>", titleIdx + 1)

  if (englishIdx === -1) {
    return [html, ""]
  }
  const polish = html.slice(0, englishIdx)
  let original = html.slice(englishIdx).split("</h3>")
  if (original.length > 1) {
    original = original[1]
  }
  return [polish, original]
}
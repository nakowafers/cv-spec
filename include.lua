function Div(div)
  if div.classes:includes("include") then
    local filepath = div.attributes["file"]
    if filepath then
      local f = io.open(filepath, "r")
      if f then
        local content = f:read("*all")
        f:close()
        return pandoc.read(content, "markdown").blocks
      end
    end
  end
  return nil
end

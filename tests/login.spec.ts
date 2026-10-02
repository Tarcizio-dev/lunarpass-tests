import { test, expect } from "@playwright/test"

test("deve autenticar no control de missões", async ({ page }) => {

  //arrange - prepar o cenario
  await page.goto("http://localhost:3000/mission-control/login")

  const title = page.getByRole("heading", { name: "Mission Control" })

//Act - execucao da acao
  await expect(title).toBeVisible()
  await page.getByLabel("E-mail").fill("buzz@lunarpass.dev")
  await page.getByLabel("Senha").fill("pwd123")
  await page.getByRole("button", { name: "Entrar" }).click()

  // Assert - verificar o resultado
  const logoutButton = page.getByRole("button", { name: "Sair" })
  await expect(logoutButton).toBeVisible()

})
test("nao deve autenticar com senha incorreta", async ({ page }) => {

  //arrange - prepar o cenario
  await page.goto("http://localhost:3000/mission-control/login")

  const title = page.getByRole("heading", { name: "Mission Control" })

//Act - execucao da acao
  await expect(title).toBeVisible()
  await page.getByLabel("E-mail").fill("buzz@lunarpass.dev")
  await page.getByLabel("Senha").fill("wrongpassword")
  await page.getByRole("button", { name: "Entrar" }).click()

  // Assert - verificar o resultado
  const alert = page.getByRole("alert")
  await expect(alert).toHaveText("E-mail ou senha inválidos.")

})

test("nao deve autenticar com email nao cadastrado", async ({ page }) => {

  //arrange - prepar o cenario
  await page.goto("http://localhost:3000/mission-control/login")

  const title = page.getByRole("heading", { name: "Mission Control" })

//Act - execucao da acao
  await expect(title).toBeVisible()
  await page.getByLabel("E-mail").fill("nonexistent@lunarpass.dev")
  await page.getByLabel("Senha").fill("wrongpassword")
  await page.getByRole("button", { name: "Entrar" }).click()

  // Assert - verificar o resultado
  const alert = page.getByRole("alert")
  await expect(alert).toHaveText("E-mail ou senha inválidos.")

})
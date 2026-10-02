import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/login.page"
import { Navbar } from "../pages/compontes/navbar"

let loginPage: LoginPage
let navbar: Navbar

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  navbar = new Navbar(page)

  //arrange - preparar o cenario
  await loginPage.go()
})

test("deve autenticar no control de missões", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("buzz@lunarpass.dev", "pwd123")

  // Assert - verificar o resultado
  await expect(navbar.logout).toBeVisible()

})

test("nao deve autenticar com senha incorreta", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("buzz@lunarpass.dev", "wrongpassword")

  // Assert - verificar o resultado
  await expect(loginPage.alert).toHaveText("E-mail ou senha inválidos.")

})

test("nao deve autenticar com email nao cadastrado", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("nonexistent@lunarpass.dev", "wrongpassword")
  
  // Assert - verificar o resultado
  await expect(loginPage.alert).toHaveText("E-mail ou senha inválidos.")

})

test("nao deve autenticar quando a senha nao é informada", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("nonexistent@lunarpass.dev", "")
  
  // Assert - verificar o resultado
  await expect(loginPage.alert).toHaveText("Informe a senha")

})

test("nao deve autenticar quando o email nao é informado", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("", "wrongpassword")
  
  // Assert - verificar o resultado
  await expect(loginPage.alert).toHaveText("Informe um e-mail válido")
  })
  test("nao deve autenticar quando na informa o email e senha", async ({ page }) => {

  //Act - execucao da acao
  await loginPage.login("", "wrongpassword")
  
  // Assert - verificar o resultado
  await expect(loginPage.alert).toHaveText("Informe um e-mail válido")
  })
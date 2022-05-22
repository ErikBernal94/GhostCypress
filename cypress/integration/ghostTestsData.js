/// <reference types="cypress" />
 const { faker } = require('@faker-js/faker');
let mockaroo = require('../utilities/mockaroo_ghost');
import * as aPrioriData from '../fixtures/GhostTest.json';

context('Actions', () => {
    before(() => {
      cy.visit('http://localhost:2368/ghost')
      login();
      createPost(textTest);
      cleanPosts()
      createPage()
      cleanPages()
      logout();
    })
  
    beforeEach(() => {
      cy.visit('http://localhost:2368/ghost');
    })
  
    // Data
    const userName = aPrioriData[0].email;
    const userPassword = aPrioriData[0].password;
    const textTest = 'Post creation test';
    const textTest2 = 'post content';
    const textTest3 = 'Page creation test';
    const textTest4 = 'Page content';
    
    // Login
    const inputEmail = '[type="email"]';
    const inputPassword = '[type="password"]';
    const btnLogin = '#login';
  
    // Post
    const btnSectionPost = '[href="#/posts/"]';
    const btnNewPost = 'a[href="#/editor/post/"]';
    const titlePost = 'textarea';
    const textPost = 'div[data-kg="editor"]';
    const btnPublishPost = 'header .ember-basic-dropdown-trigger';
    const btnModalPublishPost = 'footer button.gh-publishmenu-button';
    const btnModalPublishSurePost = '.modal-footer button.ember-view';
    const btnModalPublishDeleteSurePost = '.modal-footer button.ember-view';
    const btnBackPost = '.ember-view.gh-editor-back-button';
    const listItemPost = '.gh-posts-list-item';
    const listItemStatusPost = `${listItemPost} .gh-post-list-status`;
    const btnActions = 'main button.settings-menu-toggle';
    const btnActionsDelete = '.settings-menu-container .settings-menu-delete-button';
    const inputScheduleTime = '.gh-date-time-picker-time';
    const msjError = '.gh-date-time-picker-error';
    const radioScheduleOption = '.gh-publishmenu-radio-content';
    const filtersList = '.gh-contentfilter-menu.gh-contentfilter-type';
    const statusList = '.ember-power-select-option';
    const postsList = '.posts-list.gh-list';
  
    //Page
    const btnSectionPage = '[href="#/pages/"]';
    //const btnNewPage = '[href="#/editor/page/"]';
    const btnNewPage = '.ember-view.gh-btn.gh-btn-primary.view-actions-top-row';
    const titlePage = 'textarea';
    const textPage = 'div[data-kg="editor"]';
    const btnPublishPage = 'header .ember-basic-dropdown-trigger';
    const btnModalPublishPage = 'footer button.gh-publishmenu-button';
    const btnModalPublishSurePage = '.modal-footer button.ember-view';
    const listItemPage = '.gh-posts-list-item';
    const listItemStatusPage = `${listItemPage} .gh-post-list-status`;
    const btnBackPage = '.ember-view.gh-editor-back-button';
  
    // Members
    const btnSectionMembers = '[href="#/members/"]';
    const btnNewMember = '[href="#/members/new/"]';
    const inputName = '[name="name"]';
    const btnSave = 'main button.ember-view';
    const memberRow = '.members-list-container-stretch table tr';
    const msjErrorEmail = 'div.error .response';
    const memberData = '.ember-view.gh-list-data';
    const divMembersEmpty = '.gh-members-empty';
    const btnSettingMember = 'button.gh-btn-action-icon';
    const btnDeleteMember = '.dropdown .red';
    const emailTest = 'emailTest@email.com'

    // Tag 
    const tagNav = '[href="#/tags/"]';
    const newTagBtn = '[href="#/tags/new/"]';
    const tagName = '#tag-name';
    const expandBtn = '.gh-expandable .gh-btn-expand'; // Twitter 1, Facebook 2
    const twitterTittle = '[name="twitterTitle"]';
    const twitterDescription = '[name="twitterDescription"]';
    const facebookTittle = '#og-title';
    const facebookDescription = '#og-description';
    const saveBtn = '.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
    const tagsList = '.tags-list.gh-list';
  
    // Settings
    const btnUserSettings = 'section .ember-view.ember-basic-dropdown-trigger.pointer';
    const btnSignOut = 'li .user-menu-signout';
  
    // Others
    let ran = Math.floor(Math.random() * 101);
    const mainLoggedScreenClass = 'gh-nav-body';
    const settings = '[href="#/settings/"]';
    const navigation = '[href="#/settings/navigation/"]';
    const saveButton = '.view-actions button';
    const site = '[href="#/site/"]';
    const burger = 'ul.nav li';
    const pLoginError = '.main-error'; 

    //Faker
    const tgName = faker.name.jobArea();

  
    const login = (email = userName, password = userPassword) => {
      //Log into the site  
      cy.get(inputEmail).type(email)
      cy.get(inputPassword).type(password)
      cy.get(btnLogin).submit()
      cy.wait(1000)
    }
  
    const logout = () => {
      cy.get(btnUserSettings).click();
      cy.get(btnSignOut).click();
    }
  
    const createPost = (text = textTest) => {
      //Create post
      cy.get(btnNewPost).first().click()
      cy.get(titlePost).type(text)
      cy.get(textPost).first().focus()
      cy.wait(3000)
    }
  
    const deletePost = (id = 0) => {
      cy.get(listItemPost).eq(id).click()
      cy.get(btnActions).click()
      cy.get(btnActionsDelete).click()
      cy.get(btnModalPublishDeleteSurePost).click()
    }
  
    const cleanPosts = () => {
      cy.get(btnSectionPost).first().click();
      cy.get(listItemPost).then($item => {
        for (let index = 0; index < $item.length; index++) {
          deletePost();
        }
      })
    }
  
    const createPage = (text = textTest3) => {
      //Create post
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      cy.get(titlePage).type(text)
      cy.get(textPage).first().focus()
      cy.wait(3000)
    }
  
    const deletePage = (id = 0) => {
      cy.get(listItemPage).eq(id).click()
      cy.get(btnActions).click()
      cy.get(btnActionsDelete).click()
      cy.get(btnModalPublishDeleteSurePost).click()
    }
  
    const cleanPages = () => {
      cy.get(btnSectionPage).first().click();
      cy.get(listItemPage).then($item => {
        for (let index = 0; index < $item.length; index++) {
          deletePage();
        }
      })
    }
  
    const createMember = (email = emailTest) => {
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      if (email.length) {
        cy.get('#member-email').type(email);
      }
      cy.get(btnSave).click();
      cy.wait(1000)
    }
  
    const deleteMember = () => {
      cy.get(memberData).first().click();
      cy.get(btnSettingMember).click();
      cy.get(btnDeleteMember).click();
      cy.get(btnModalPublishDeleteSurePost).first().click();
    }
  
    //1
    it('login, sin datos',() => {
        //GIVEN: a user visited 'http://localhost:2368/ghost'
        
        //WHEN: the user login without values
        cy.get(btnLogin).submit()
        cy.wait(1000)
        //THEN: should exists error tag
        cy.get(pLoginError).should('be.visible');
    })

    //2
    it('login, sin correo contraseña válida',() => {
        //GIVEN: a user visited 'http://localhost:2368/ghost'
        
        //WHEN: the user login without email value
        cy.get(inputEmail).type(userName)
        cy.get(btnLogin).submit()
        cy.wait(1000)
        //THEN: should exists error tag
        cy.get(pLoginError).should('be.visible');
    })

    //3
    it('login, sin correo contraseña válida',() => {
        //GIVEN: a user visited 'http://localhost:2368/ghost'
        
        //WHEN: the user login without password value
        cy.get(inputPassword).type(userPassword)
        cy.get(btnLogin).submit()
        cy.wait(1000)
        //THEN: should exists error tag
        cy.get(pLoginError).should('be.visible');
    })
    //4
    it('login, correo no existente formato correo',() => {
      //GIVEN: a user visited 'http://localhost:2368/ghost'
      
      //WHEN: the user email does not exist
      let pseudoData;
      mockaroo.getPseudoData((data)=>{
          pseudoData = data;
          login(pseudoData[ran].email,pseudoData[ran].password );
          //THEN: should exists error tag
          cy.get(pLoginError).should('be.visible');
      });  
        
    }) 
    //5 
    it('login, correo sin formato',() => {
      //GIVEN: a user visited 'http://localhost:2368/ghost'
        
      //WHEN: the user email without format
      login(faker.datatype.string(),faker.datatype.string());
      //THEN: should exists error tag
      cy.get(pLoginError).should('be.visible');
    })

    //6
    it('login, correo vállido con contraseña invalida',() => {
      //GIVEN: a user visited 'http://localhost:2368/ghost'
        
      //WHEN: the user password does not match
      login(userName,aPrioriData[ran].password);
      //THEN: should exists error tag
      cy.get(pLoginError).should('be.visible');
    })

    //7
    it('login, correo vállido con contraseña invalida',() => {
      //GIVEN: a user visited 'http://localhost:2368/ghost'
        
      //WHEN: the user login ok
      login(userName,userPassword);
      //THEN: should be into the site
      cy.get('section').should('have.class', mainLoggedScreenClass);
    })





    //73
    it('login, crear tag con twitter card que tenga metatítulo de 299 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      cy.get(expandBtn).eq(1).click();
      mockaroo.getPseudoData((data)=>{
        cy.get(twitterTittle).type(data[ran].text_299);
      }); 
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the tag craeted exists
      cy.get(tagNav).eq(0).click();
      cy.get(tagsList).should('contain', name);
    })
  
    //74
    it('login, crear tag con twitter card que tenga metatítulo de 300 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 300 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      cy.get(expandBtn).eq(1).click();
      cy.get(twitterTittle).type(aPrioriData[ran].text_300);
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the tag craeted exists
      cy.get(tagNav).eq(0).click();
      cy.get(tagsList).should('contain', name);
    })
  
    //75
    it('login, crear tag con twitter card que tenga metatítulo de 301 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 301 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      cy.get(expandBtn).eq(1).click();
      mockaroo.getPseudoData((data)=>{
        cy.get(twitterTittle).type(data[ran].text_301);
      }); 
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the could'nt be created
      cy.contains('Validation error, cannot save tag. Validation failed for twitter_title.');
    })

    //76
    it('login, crear tag con twitter card que tenga descripción de 499 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      cy.get(twitterDescription).type(aPrioriData[ran].text_499);
      cy.get(expandBtn).eq(1).click();
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the tag craeted exists
      cy.get(tagNav).eq(0).click();
      cy.get(tagsList).should('contain', name);
    })

    //77
    it('login, crear tag con twitter card que tenga descripción de 500 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      mockaroo.getPseudoData((data)=>{
        cy.get(twitterTittle).type(data[ran].text_500);
      }); 
      cy.get(expandBtn).eq(1).click();
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the tag craeted exists
      cy.get(tagNav).eq(0).click();
      cy.get(tagsList).should('contain', name);
    })

    //78
    it('login, crear tag con twitter card que tenga descripción de 501 carácteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
      login(userName, userPassword);
      cy.get(tagNav).click();
      cy.get(newTagBtn).click();
      cy.get(tagName).eq(0).type(tgName);
      const name = tgName;
      cy.get(twitterDescription).type(aPrioriData[ran].text_501);
      cy.get(expandBtn).eq(1).click();
      cy.get(saveBtn).click();
      cy.wait(1000);
  
      // THEN: the tag craeted exists
      cy.get(tagNav).eq(0).click();
      cy.get(tagsList).should('contain', name);
    })
  
  })
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
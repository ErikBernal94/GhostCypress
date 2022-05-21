/// <reference types="cypress" />
 const { faker } = require('@faker-js/faker');
let mockaroo = require('../utilities/mockaroo_ghost');
import * as aPrioriData from '../fixtures/GhostTest.json';

context('Actions', () => {
    before(() => {
      cy.visit('http://localhost:2368/ghost')
      login();
      createPost(textTest, textPost);
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
    const btnRetry = 'main button.gh-btn-red';
    const memberRow = '.members-list-container-stretch table tr';
    const msjErrorEmail = 'div.error .response';
    const memberData = '.ember-view.gh-list-data';
    const memberEmail = '#member-email'
    const divMembersEmpty = '.gh-members-empty';
    const btnSettingMember = 'button.gh-btn-action-icon';
    const btnDeleteMember = '.dropdown .red';
    const emailTest = 'emailTest@email.com'
    const inputLabel = '.ember-power-select-trigger-multiple-input'
    const selectLabel = '.ember-power-select-option'
    const response= '.response';
    const memberNote = '[name="note"]'
  
    // Settings
    const btnUserSettings = 'section .ember-view.ember-basic-dropdown-trigger.pointer';
    const btnSignOut = 'li .user-menu-signout';
  
    // Others
    const mainLoggedScreenClass = 'gh-nav-body';
    const settings = '[href="#/settings/"]';
    const navigation = '[href="#/settings/navigation/"]';
    const saveButton = '.view-actions button';
    const site = '[href="#/site/"]';
    const burger = 'ul.nav li';
    const pLoginError = '.main-error'; 
  
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
  
    const createPost = (textTitle, textDescription) => {
      //Create post
      cy.get(btnNewPost).first().click()
      cy.get(titlePost).type(textTitle)
      cy.get(textPost).first().focus()
      cy.get(textPost).type(textDescription)
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
          let ran = Math.floor(Math.random() * 101)
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
      let ran = Math.floor(Math.random() * 101)
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

    //8
    it('crear post sin datos', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);

      // WHEN: the user creates a post and publishes it
      cy.get(btnNewPost).first().click()
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      // THEN: the published post exists
      //Verify published post
      cy.get(btnPublishPost).should('not.exist');
    })

    //9
    it('login, crear post, solo titulo', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnNewPost).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(titlePost).type(title)
        cy.get(textPost).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPost).click()
        cy.get(btnModalPublishPost).click()
        cy.get(btnModalPublishDeleteSurePost).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPost).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPost).first().should('contain', title)
        cy.get(listItemStatusPost).first().should('contain', 'Published')
      });  
      
    })

    //10
    it('login, crear post, solo descripción', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnNewPost).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(textPost).type(title)
        cy.get(titlePost).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPost).click()
        cy.get(btnModalPublishPost).click()
        cy.get(btnModalPublishDeleteSurePost).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPost).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPost).first().should('contain', title)
        cy.get(listItemStatusPost).first().should('contain', 'Published')
      });  
      
    })

    //11
    it('login, crear post, titulo con longitud de 254', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnNewPost).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(titlePost).type(title)
        cy.get(textPost).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPost).click()
        cy.get(btnModalPublishPost).click()
        cy.get(btnModalPublishDeleteSurePost).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPost).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPost).first().should('contain', title)
        cy.get(listItemStatusPost).first().should('contain', 'Published')
      });
    })

    //12
    it('login, crear post, titulo con longitud de 255', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = aPrioriData[ran].text_255
      cy.get(titlePost).type(title)
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', title)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //13
    it('login, crear post, titulo con longitud de 256', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = aPrioriData[ran].text_256
      cy.get(titlePost).type(title)
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      // THEN: the published post exists
      //Verify published post
      cy.get(btnPublishPost).should('not.exist');
      
    })

    //14
    it('login, crear post, titulo con numeros', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = faker.random.numeric(6)
      cy.get(titlePost).type(title)
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', title)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })
    
    //15
    it('login, crear post, titulo con caracteres especiales', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = faker.datatype.string(6)
      cy.get(titlePost).type(title)
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', title)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //16
    it('login, crear post, titulo con alfanumerico', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = faker.random.alphaNumeric(6)
      cy.get(titlePost).type(title)
      cy.get(textPost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', title)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //17
    it('login, crear post, descripción con numeros', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let description = faker.random.numeric(6)
      cy.get(textPost).type(description)
      cy.get(titlePost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })
    
    //18
    it('login, crear post, descripción con caracteres especiales', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let description = faker.datatype.string(6)
      cy.get(textPost).type(description)
      cy.get(titlePost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //19
    it('login, crear post, descripción con alfanumericos', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnNewPost).first().click()
      let description = faker.random.alphaNumeric(6)
      cy.get(textPost).type(description)
      cy.get(titlePost).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishDeleteSurePost).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //20
    it('crear pagina sin datos', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);

      // WHEN: the user creates a post and publishes it
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      // THEN: the published post exists
      //Verify published post
      cy.get(btnPublishPage).should('not.exist');
    })

    //21
    it('login, crear page, solo titulo', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a page and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnSectionPage).first().click();
        cy.get(btnNewPage).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(titlePage).type(title)
        cy.get(textPage).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPage).click()
        cy.get(btnModalPublishPage).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPage).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPage).first().should('contain', title)
        cy.get(listItemStatusPage).first().should('contain', 'Published')
      });  
      
    })

    //22
    it('login, crear pagina, solo descripción', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnSectionPage).first().click();
        cy.get(btnNewPage).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(textPage).type(title)
        cy.get(titlePage).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPage).click()
        cy.get(btnModalPublishPage).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPage).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPage).first().should('contain', title)
        cy.get(listItemStatusPage).first().should('contain', 'Published')
      });  
      
    })

    //23
    it('login, crear página, titulo con longitud de 254', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      mockaroo.getPseudoData((pseudoData)=>{
        cy.wait(3000)
        cy.get(btnSectionPage).first().click();
        cy.get(btnNewPage).first().click()
        let ran = Math.floor(Math.random() * 101)
        let title = pseudoData[ran].text_254
        cy.get(titlePage).type(title)
        cy.get(textPage).first().focus()
        cy.wait(3000)
    
        //Publish post
        cy.get(btnPublishPage).click()
        cy.get(btnModalPublishPage).click()
        cy.wait(1000)
    
        //Go back to posts list
        cy.get(btnBackPage).eq(0).click()
    
        // THEN: the published post exists
        //Verify published post
        cy.get(listItemPage).first().should('contain', title)
        cy.get(listItemStatusPage).first().should('contain', 'Published')
      });
    })

    //24
    it('login, crear página, titulo con longitud de 255', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = aPrioriData[ran].text_255
      cy.get(titlePage).type(title)
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', title)
      cy.get(listItemStatusPage).first().should('contain', 'Published')
      
    })

    //25
    it('login, crear página, titulo con longitud de 256', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = aPrioriData[ran].text_256
      cy.get(titlePage).type(title)
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      // THEN: the published post exists
      //Verify published post
      cy.get(btnPublishPage).should('not.exist');
      
    })

    //26
    it('login, crear pagina, titulo con numeros', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = faker.random.numeric(6)
      cy.get(titlePage).type(title)
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', title)
      cy.get(listItemStatusPage).first().should('contain', 'Published')
      
    })
    
    //27
    it('login, crear página, titulo con caracteres especiales', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let title = faker.datatype.string(6)
      cy.get(titlePage).type(title)
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', title)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })

    //28
    it('login, crear página, titulo con alfanumerico', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let ran = Math.floor(Math.random() * 101)
      let title = faker.random.alphaNumeric(6)
      cy.get(titlePage).type(title)
      cy.get(textPage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', title)
      cy.get(listItemStatusPage).first().should('contain', 'Published')
      
    })

    //29
    it('login, crear página, descripción con numeros', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let description = faker.random.numeric(6)
      cy.get(textPage).type(description)
      cy.get(titlePage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPost).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
    })
    
    //30
    it('login, crear página, descripción con caracteres especiales', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let description = faker.datatype.string(6)
      cy.get(textPage).type(description)
      cy.get(titlePage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
  
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPage).first().should('contain', 'Published')
      
    })

    //31
    it('login, crear página, descripción con alfanumericos', () => {
      
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a post and publishes it
      //Create post
      cy.wait(3000)
      cy.get(btnSectionPage).first().click();
      cy.get(btnNewPage).first().click()
      let description = faker.random.alphaNumeric(6)
      cy.get(textPage).type(description)
      cy.get(titlePage).first().focus()
      cy.wait(3000)
  
      //Publish post
      cy.get(btnPublishPage).click()
      cy.get(btnModalPublishPage).click()
      cy.wait(1000)
  
      //Go back to posts list
      cy.get(btnBackPage).eq(0).click()
      
      // THEN: the published post exists
      //Verify published post
      cy.get(listItemPage).first().should('contain', '(Untitled)')
      cy.get(listItemStatusPage).first().should('contain', 'Published')
      
    })

    //32
    it('login, members, new member, sin datos', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      
      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnRetry).first().should('be.visible');
    })

    //33
    it('login, members, new member, nombre con 190 caracteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      mockaroo.getPseudoData( pseudoData =>{
        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        let name = pseudoData[ran].text_190
        let email = pseudoData[ran].email
        cy.get(inputName).type(name);
        cy.get(memberEmail).type(email)
        
        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnSectionMembers).first().click();
        cy.wait(2000)
        cy.get(memberData).first().should('contain', email);
      })
      
    })

    //34
    it('login, members, new member, nombre con 191 caracteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      mockaroo.getPseudoData( pseudoData =>{
        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        let name = pseudoData[ran].text_191
        let email = pseudoData[ran].email
        cy.get(inputName).type(name);
        
        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnSectionMembers).first().click();
        cy.wait(2000)
        cy.get(memberData).first().should('contain', email);
      })
      
    })

    //35
    it('login, members, new member, nombre con 192 caracteres', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      mockaroo.getPseudoData( pseudoData =>{
        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        let name = pseudoData[ran].text_192
        cy.get(inputName).type(name);
        
        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnRetry).first().should('be.visible');
      })
      
    })

    //36
    it('login, members, new member, email invalido', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      cy.get(memberEmail).type(faker.datatype.string());
      
      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnRetry).first().should('be.visible');
    })

    //37
    it('login, members, new member, verificar que este en la lista de members', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      let ran = Math.floor(Math.random() * 101)
      let email = aPrioriData[0].email
      createMember(email);
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
    })

    //38
    it('login, members, new member, nombre con caracteres especiales', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      cy.get(inputName).type(faker.datatype.string());
      let email = faker.internet.email();
      cy.get(memberEmail).type(email);
      
      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
      
    })

    //39
    it('login, members, new member, nombre con caracteres alfanumericos', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      cy.get(inputName).type(faker.random.alphaNumeric());

      let email = faker.internet.email();
      cy.get(memberEmail).type(email);
      
      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
    })

    //40
    it('login, members,miembro con correo existente', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      let ran = Math.floor(Math.random() * 101)
      let email = aPrioriData[0].email
      createMember(email);
  
      //THEN: The member is displayed in the member's list
      cy.get(btnRetry).first().should('be.visible');
    })

    //41
    it('login, members, new member, label con caracteres especiales', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      cy.get(inputLabel).type(faker.datatype.string());
      cy.get(selectLabel).click();
      
      let email = faker.internet.email();
      cy.get(memberEmail).type(email);

      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
      
    })

    //42
    it('login, members, new member, nota con caracteres especiales', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      cy.get(memberNote).type(faker.datatype.string());
      let email = faker.internet.email();
      cy.get(memberEmail).type(email);

      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
      
    })

    //43
    it('login, members, new member, nota con 499 caracteres ', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      mockaroo.getPseudoData((pseudoData) =>{

        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        cy.get(memberEmail).type(pseudoData[ran].email);
        cy.get(memberNote).type(pseudoData[ran].text_499);

        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnSectionMembers).first().click();
        cy.wait(2000)
        cy.get(memberData).first().should('contain', pseudoData[ran].email);
      } )
      
    })

    //44
    it('login, members, new member, nota con 500 caracteres especiales', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      mockaroo.getPseudoData((pseudoData) =>{

        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        cy.get(memberEmail).type(pseudoData[ran].email);
        cy.get(memberNote).type(pseudoData[ran].text_500);

        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnSectionMembers).first().click();
        cy.wait(2000)
        cy.get(memberData).first().should('contain', pseudoData[ran].email);
      } )
      
    })

    //45
    it('login, members, new member, nota con 501 caracteres especiales', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      mockaroo.getPseudoData((pseudoData) =>{

        cy.get(btnSectionMembers).first().click();
        cy.get(btnNewMember).eq(0).click();
        let ran = Math.floor(Math.random() * 101)
        cy.get(memberEmail).type(pseudoData[ran].email);
        cy.get(memberNote).type(pseudoData[ran].text_501);

        cy.get(btnSave).click();
        cy.wait(1000)
    
        //THEN: The member is displayed in the member's list
        cy.get(btnRetry).first().should('be.visible');
      } )
      
    })

    //46
    it('login, members, new member, label con espacio', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      let email = faker.internet.email();
      cy.get(memberEmail).type(email)
      cy.get(inputLabel).type(faker.lorem.words(2));
      cy.get(selectLabel).click();

      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
      
    })

    //46
    it('login, members, new member, todos los campos validos', () => {
      // GIVEN: a user visited 'http://localhost:2368/ghost' and login
      login(userName,userPassword);
      // WHEN: the user creates a new member
      
      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      let ran = Math.floor(Math.random() * 101)
      let email = aPrioriData[ran].email;
      cy.get(memberEmail).type(email)
      cy.get(inputLabel).type(faker.lorem.words(2));
      cy.get(selectLabel).click();
      cy.get(memberNote).type(aPrioriData[ran].text_190);
      cy.get(inputName).type(aPrioriData[ran].text_190);
      cy.get(btnSave).click();
      cy.wait(1000)
  
      //THEN: The member is displayed in the member's list
      cy.get(btnSectionMembers).first().click();
      cy.wait(2000)
      cy.get(memberData).first().should('contain', email);
      
    })  
  
  })
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
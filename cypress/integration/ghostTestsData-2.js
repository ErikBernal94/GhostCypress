/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
let mockaroo = require('../utilities/mockaroo_ghost');
import * as aPrioriData from '../fixtures/GhostTest.json';
import * as aPrioriDataCharacter from '../fixtures/dataCharacteres.json';
import { mockapi, validLanguages } from '../fixtures/mockapi';

context('Actions', () => {


  module.exports = (on, config) => {
    on('before:browser:launch', (browser, launchOptions) => {
      if (browser.name === 'chrome' && browser.isHeadless) {
        launchOptions.args.push('--disable-gpu');
        return launchOptions
      }
    });
  }
  before(() => {
    cy.visit('http://localhost:2368/ghost')
    login();
    createPost(textTest, textPost);
    cleanPosts()
    createPage()
    cleanPages()
    createTag();
    cleanTags();
    logout();
  })

  beforeEach(() => {
    cy.visit('http://localhost:2368/ghost');
  })

  // #region Selectors

  // Data
  const userName = aPrioriData[0].email;
  const userPassword = aPrioriData[0].password;
  const textTest = 'Post creation test';
  const textTest3 = 'Page creation test';

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
  const memberEmail = '#member-email'
  const divMembersEmpty = '.gh-members-empty';
  const btnSettingMember = 'button.gh-btn-action-icon';
  const btnDeleteMember = '.dropdown .red';
  const emailTest = 'emailTest@email.com'
  const inputLabel = '.ember-power-select-trigger-multiple-input'
  const selectLabel = '.ember-power-select-option'
  const response = '.response';
  const memberNote = '[name="note"]';

  // Tag 
  const tagNav = '[href="#/tags/"]';
  const newTagBtn = '[href="#/tags/new/"]';
  const tagName = '#tag-name';
  const expandBtn = '.gh-expandable .gh-btn-expand'; // Twitter 1, Facebook 2
  const twitterTittle = 'input[name="twitterTitle"]';
  const twitterDescription = 'textarea[name="twitterDescription"]';
  const facebookTittle = 'input[name="ogTitle"]';
  const facebookDescription = 'textarea[name="ogDescription"]';
  const saveBtn = '.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
  const btnModalPublishDeleteSureTag = '.modal-footer button.gh-btn-red';
  const listTags = '.gh-tags-list-item';
  const btnRetry = 'button.gh-btn-red';
  const tagsList = '.tags-list.gh-list';
  const btnSaved = '.gh-btn .gh-btn-primary .gh-btn-icon .ember-view';
  const inputColor = 'input[name="accent-color"]';
  const descriptionTag = 'textarea[name="description"]';
  const metaTile = 'input[name="metaTitle"]';
  const metaDescription = 'textarea[name="metaDescription"]';
  const urlCanonical = 'input[name="canonicalUrl"]';
  const tagDescription = '#tag-description';
  const tagSlug = '#tag-slug';
  const tagExpandableButton = '.gh-expandable-block button';
  const tagTwitterTitle = '#twitter-title';
  const tagTwitterDescription = '#twitter-description';
  const tagFacebookTitle = '#og-title';
  const tagFacebookDescription = '#og-description';

  // Settings
  const btnUserSettings = 'section .ember-view.ember-basic-dropdown-trigger.pointer';
  const btnSignOut = 'li .user-menu-signout';
  const btnSettings = 'a[href="#/settings/"]';
  const btnSettingsGeneral = 'a[href="#/settings/general/"]';
  const expandButton = '.gh-main-section button';
  const generalSettingsInput = 'input.ember-text-field.gh-input';
  const settingsSaveButton = 'section.view-actions button';
  const settingsSaveButtonSuccess = '.gh-btn.gh-btn-icon.gh-btn-green';
  const settingsMetaDescription = '#metaDescription';
  const settingMetaTitle = '#metaTitle';
  const settingsTwitterTitle = '#twitterTitle';
  const settingsTwitterDescription = '.gh-twitter-settings-left textarea';
  const settingsFacebookTitle = '#ogTitle';
  const settingsFacebookDescription = '.gh-og-settings-left textarea';

  //Staff
  const staff = '[href="#/settings/staff/"]';
  const staffEmail = '#new-user-email';
  const closeButton = '.close';
  const staffItem = '.apps-grid';

  // Others
  let ran = Math.floor(Math.random() * 101);
  const mainLoggedScreenClass = 'gh-nav-body';
  const settings = '[href="#/settings/"]';
  const navigation = '[href="#/settings/navigation/"]';
  const saveButton = '.view-actions button';
  const site = '[href="#/site/"]';
  const burger = 'ul.nav li';
  const pLoginError = '.main-error';
  const errorBar = 'article.gh-alert-red';
  const validTagTitle = 'valid title';

  //Faker
  const tgName = faker.name.jobArea();

  //#endregion

  //#region Methods

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

  const deleteTag = (id = 0) => {
    cy.get(listTags).eq(id).click()
    cy.contains('Delete tag').click()
    cy.get(btnModalPublishDeleteSureTag).first().click()
    cy.wait(3000)
  }

  const cleanTags = (text = textTest) => {
    cy.get(tagNav).first().click();
    cy.get(listTags).then($item => {
      for (let index = 0; index < $item.length; index++) {
        deleteTag();
      }
    })
  }

  const createTag = () => {
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).type('test tag');
    cy.get(saveBtn).eq(0).click();
  }

  const getRandom = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber);
  }

  //#endregion

  // #region Tests

  //44
  it('login, members, new member, nota con 500 caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    login(userName, userPassword);
    // WHEN: the user creates a new member

    mockaroo.getPseudoData((pseudoData) => {

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
    })

  })

  //45
  it('login, members, new member, nota con 501 caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    login(userName, userPassword);
    // WHEN: the user creates a new member

    mockaroo.getPseudoData((pseudoData) => {

      cy.get(btnSectionMembers).first().click();
      cy.get(btnNewMember).eq(0).click();
      let ran = Math.floor(Math.random() * 101)
      cy.get(memberEmail).type(pseudoData[ran].email);
      cy.get(memberNote).type(mockapi[getRandom(mockapi.length)].text_501, { force: true });

      cy.get(btnSave).click();
      cy.wait(1000)

      //THEN: The member is displayed in the member's list
      cy.get(btnRetry).first().should('be.visible');
    })

  })

  //46
  it('login, members, new member, label con espacio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    login(userName, userPassword);
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

  //47
  it('login, members, new member, todos los campos validos', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    login(userName, userPassword);
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


  //48
  it('login, crear tag campos vacios', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //49
  it('Login, crear tag con caracteres especiales en el campo nombre.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    const nameTag = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(tagName).eq(0).type(nameTag);
    cy.contains('Save').first().click();

    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', nameTag);
    cy.wait(3000)
  })

  //50
  it('Login, crear tag con 190 caracteres en el campo nombre.', () => {
    //GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    const nameTag = aPrioriData[ran].text_190;
    cy.get(tagName).eq(0).type(nameTag);
    cy.contains('Save').first().click();

    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', nameTag);
    cy.wait(3000)
  })

  //51
  it('Login, crear tag con 191 caracteres en el campo nombre.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    const nameTag = aPrioriData[ran].text_191;
    cy.get(tagName).eq(0).type(nameTag);
    cy.contains('Save').first().click();

    //THEN  the tag not created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', nameTag);
    cy.wait(3000)
  })

  //52
  it('Login, crear tag con 192 caracteres en el campo nombre.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    const nameTag = aPrioriData[ran].text_191;
    cy.get(tagName).eq(0).type(nameTag + 'a');
    cy.contains('Save').first().click();

    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //53
  it('Login, crear tag con nombre valido y color en formato hexadecimal.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with color
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    let colorHex = aPrioriDataCharacter[ran].colorHexa;
    colorHex = colorHex.substr(1, 7);
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(inputColor).eq(0).type(colorHex);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000)
  })

  //54
  it('Login, crear tag con nombre válido y color sin formato hexadecimal.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with color
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    let color = aPrioriDataCharacter[ran].color;
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(inputColor).eq(0).type(color);
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //55
  it('Login, crear tag con nombre válido y 499 caracteres en el campo descripción', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with description
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriData[ran].text_499;
    cy.get(descriptionTag).eq(0).type(descrip);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //56
  it('Login, crear tag con nombre válido y 500 caracteres en el campo descripción', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with description
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriData[ran].text_500;
    cy.get(descriptionTag).eq(0).type(descrip);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //57
  it('Login, crear tag con nombre válido y 501 caracteres en el campo descripción', () => {
    //GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with description
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click()
    cy.get(tagName).eq(0).type(tgName);
    cy.get(descriptionTag).type(mockapi[getRandom(mockapi.length)].text_501, { force: true });
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //58
  it('Login, crear tag con nombre inválido, luego editar por nombre valido y guardar', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.contains('Save').first().click();

    cy.get(tagName).eq(0).type(tgName);
    cy.get(descriptionTag).type(faker.datatype.string())
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().click()
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //59
  it('Login, crear tag con nombre válido y caracteres especiales en el campo descripción', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with description
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(descriptionTag).type(faker.datatype.string())
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //60
  it('Login, crear tag con nombre válido y caracteres alfanuméricos en el campo descripción', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with description
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(descriptionTag).type(faker.datatype.string())
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //61
  it('login, crear tag con meta data, meta titulo caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(0).click();
    const titleCarcteres = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(metaTile).eq(0).type(titleCarcteres);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })  

  //62
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar meta título con caracteres alfanuméricos', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //63
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar descripción con 499 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag  with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriData[ran].text_499;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(metaDescription).eq(0).type(descrip)
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //64
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar descripción con 500 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriData[ran].text_500;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(metaDescription).eq(0).type(descrip)
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //65
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar descripción con 501 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(metaDescription).eq(0).type(mockapi[getRandom(mockapi.length)].text_501, { force: true });
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //66
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar descripción con caracteres epseciales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const descrip = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(metaDescription).eq(0).type(descrip)
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //67
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar url válida', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const url = aPrioriDataCharacter[ran].url;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(urlCanonical).eq(0).type(url)
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //68
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar url inválida. ', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const url = faker.datatype.string();
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(urlCanonical).eq(0).type(url)
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //69
  it('Login, crear con nombre válido y en la sección de metadata, agregar url con caracteres especiales.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const url = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(faker.datatype.string());
    cy.get(urlCanonical).eq(0).type(url)
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //71
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar meta título con 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag  with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const titulo = aPrioriData[ran].text_299;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(titulo);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //72
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar meta título con 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const titulo = aPrioriData[ran].text_300;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(titulo);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(3000);
  })

  //73
  it('Login, crear tag con nombre válido y en la sección de metadata, agregar meta título con 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with metadata
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    const titulo = aPrioriData[ran].text_301;
    cy.get(expandBtn).eq(0).click();
    cy.get(metaTile).eq(0).type(titulo);
    cy.contains('Save').first().click();
    //THEN  the tag is not created
    cy.wait(1000);
    cy.get(btnRetry).first().should('contain', 'Retry')
    cy.wait(3000)
  })

  //74
  it('login, crear tag con twitter card que tenga metatítulo de 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(aPrioriData[ran].text_299);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //75
  it('login, crear tag con twitter card que tenga metatítulo de 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Twitter card and the twitter tittle has 300 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(aPrioriData[ran].text_300);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //76
  it('login, crear tag con twitter card que tenga metatítulo de 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Twitter card and the twitter tittle has 301 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(aPrioriData[ran].text_301);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag could'nt be created
    cy.contains('Validation error, cannot save tag. Validation failed for twitter_title.');
  })

  //77
  it('login, crear tag con twitter card que tenga descripción de 499 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the facebook description has 499 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(faker.random.words(4));
    cy.get(twitterDescription).eq(0).type(aPrioriData[ran].text_499);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //78
  it('login, crear tag con twitter card que tenga descripción de 500 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the facebook description has 500 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(faker.random.words(4));
    cy.get(twitterDescription).eq(0).type(aPrioriData[ran].text_500);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //79
  it('login, crear tag con twitter card que tenga descripción de 501 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the facebook description has 501 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(faker.random.words(4));
    cy.get(twitterDescription).eq(0).type(mockapi[getRandom(mockapi.length)].text_501, { force: true });
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.contains('Validation error, cannot save tag. Validation failed for twitter_description.');

  })

  //80
  it('login, crear tag con twitter card que tenga descripción con caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    //WHEN the user creates a tag with twitter card
    login(userName, userPassword);
    cy.get(tagNav).first().click()
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(1).click();
    cy.get(twitterTittle).eq(0).type(faker.random.words(4));
    const descrip = aPrioriDataCharacter[ran].nameCharacteres;
    cy.get(twitterDescription).eq(0).type(descrip);
    cy.contains('Save').first().click();
    //THEN  the tag is created
    cy.wait(1000);
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
    cy.wait(1000);
  })

  //81
  it('login, crear tag con facebook card que tenga metatítulo de 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the Facebook tittle has 299 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(aPrioriData[ran].text_299);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //82
  it('login, crear tag con facebook card que tenga metatítulo de 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the Facebook tittle has 300 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(aPrioriData[ran].text_300);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //83
  it('login, crear tag con facebook card que tenga metatítulo de 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the Facebook tittle has 301 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(aPrioriData[ran].text_301);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the could'nt be created
    cy.contains('Validation error, cannot save tag. Validation failed for og_title.');
  })

  //84
  it('login, crear tag con facebook card que tenga descripción de 499 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Facebook card and the Facebook description has 499 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(faker.random.words(4));
    cy.get(facebookDescription).eq(0).type(aPrioriData[ran].text_499);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //#endregion

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

});

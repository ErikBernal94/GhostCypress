/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
let mockaroo = require('../utilities/mockaroo_ghost');
import * as aPrioriData from '../fixtures/GhostTest.json';
import * as aPrioriDataCharacter from '../fixtures/dataCharacteres.json';
import { mockapi, validLanguages } from '../fixtures/mockapi';

context('Actions', () => {
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

  //85
  it('login, crear tag con facebook card que tenga descripción de 500 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(faker.random.words(4));
    cy.get(facebookDescription).eq(0).type(aPrioriData[ran].text_500);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.get(tagNav).eq(0).click();
    cy.get(tagsList).should('contain', name);
  })

  //86
  it('login, crear tag con facebook card que tenga descripción de 501 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a tag with Twitter card and the twitter tittle has 299 characters
    login(userName, userPassword);
    cy.get(tagNav).eq(0).click();
    cy.get(newTagBtn).eq(0).click();
    cy.get(tagName).eq(0).type(tgName);
    const name = tgName;
    cy.get(expandBtn).eq(2).click();
    cy.get(facebookTittle).eq(0).type(faker.random.words(4));
    cy.get(facebookDescription).eq(0).type(aPrioriData[0].text_501);
    cy.get(saveBtn).eq(0).click();
    cy.wait(1000);

    // THEN: the tag craeted exists
    cy.contains('Validation error, cannot save tag. Validation failed for og_description.');

  })

  //87
  it('login, crear colaborador con email válido', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a new staff member with valid email
    login(userName, userPassword);
    cy.get(settings).eq(0).click();
    cy.get(staff).eq(0).click();
    cy.contains('Invite people').eq(0).click();
    const stffEmail = aPrioriData[ran].email;
    cy.get(staffEmail).eq(0).type(stffEmail);
    // THEN: the staff member exists
    cy.contains('Send invitation now →').eq(0).click();
    cy.wait(4000);

  })

  //88
  it('login, crear colaborador con email invalido', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a new staff member with no valid email
    login(userName, userPassword);
    cy.get(settings).eq(0).click();
    cy.get(staff).eq(0).click();
    cy.contains('Invite people').eq(0).click();
    cy.get(staffEmail).eq(0).type(aPrioriDataCharacter[ran].nameCharacteres);
    cy.contains('Send invitation now →').eq(0).click();
    cy.wait(2000);

    // THEN: the staff member couldn't be created and we have an error warning
    cy.contains('Invalid Email.');

  })

  //89
  it('login, crear colaborador con email repetido', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a new staff member with valid email
    login(userName, userPassword);
    cy.get(settings).eq(0).click();
    cy.get(staff).eq(0).click();
    cy.contains('Invite people').eq(0).click();
    const stffEmail = aPrioriData[ran].email;
    cy.get(staffEmail).eq(0).type(stffEmail);
    cy.contains('Send invitation now →').eq(0).click();
    cy.wait(3000);
    cy.get(closeButton).eq(0).click();
    cy.contains('Invite people').eq(0).click();
    cy.get(staffEmail).eq(0).type(stffEmail);
    cy.contains('Send invitation now →').eq(0).click();
    cy.wait(2000);

    // THEN: the staff member already exists and we have an error warning
    cy.contains('A user with that email address was already invited.');

  })

  //90
  it('login, crear colaborador con email vacío', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login
    // WHEN: the user creates a new staff member with valid email
    login(userName, userPassword);
    cy.get(settings).eq(0).click();
    cy.get(staff).eq(0).click();
    cy.contains('Invite people').eq(0).click();
    cy.get(staffEmail).eq(0).type(' ');
    cy.contains('Send invitation now →').eq(0).click();
    cy.wait(2000);

    // THEN: the staff member couldn't be created and we have a warning error
    cy.contains('Please enter an email.');

  })

  // 91: configuración general: título con 149 caracteres (límite inferior)
  it('login, configuración general, título con 149 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the title with 149 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(0).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 149), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 92: configuración general: título con 150 caracteres (límite max)
  it('login, configuración general, título con 150 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the title 150 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(0).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 150), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 93: configuración general: título con 151 caracteres (límite superior)
  it('login, configuración general, título con 151 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the title and description with 151 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(0).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 151), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get('.response').eq(0).invoke('text').should('include', 'Title is too long');
  });

  // 94: configuración general: título con caracteres especiales
  it('login, configuración general, título con caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the title with special characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(0).clear().type(aPrioriDataCharacter[ran].nameCharacteres.substring(0, 150), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 95: configuración general: título vacío
  it('login, configuración general, título vacío', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the title as empty
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(0).clear();
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 96: configuración general: descripción con 199 caracteres (límite inferior)
  it('login, configuración general, descripción con 199 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the description with 199 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(1).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 199), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 97: configuración general: descripción con 200 caracteres (límite max)
  it('login, configuración general, descripción con 200 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the description with 200 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(1).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 200), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 98: configuración general: descripción con 201 caracteres (límite superior)
  it('login, configuración general, descripción con 201 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the description with 201 characters text
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(0).click();

    cy.get(generalSettingsInput).eq(1).clear().type(mockapi[getRandom(mockapi.length)].text_299.substring(0, 201), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get('.response').eq(1).invoke('text').should('include', 'Description is too long');
  });

  // 99: configuración general: lenguaje con numeros
  it('login, configuración general, lenguaje con numeros', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the language with numbers
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(2).click();

    const fakeNumber = faker.datatype.number();
    cy.get(generalSettingsInput).eq(0).clear().type(fakeNumber.toString(), { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 100: configuración general: lenguaje con caracteres especiales
  it('login, configuración general, lenguaje con caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the language with special characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(2).click();

    cy.get(generalSettingsInput).eq(0).clear().type(aPrioriDataCharacter[ran].nameCharacteres, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 101: configuración general: lenguaje correcto
  it('login, configuración general, lenguaje correcto', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates with valid language
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(2).click();

    cy.get(generalSettingsInput).eq(0).clear().type(validLanguages[getRandom(validLanguages.length)], { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 102: configuración general: Título de metadata con caracteres especiales
  it('login, configuración general, título metadata con caracteres especiales', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the metadata title with special characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingMetaTitle).clear().type(aPrioriDataCharacter[ran].nameCharacteres, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 103: configuración general: Título de metadata vacío
  it('login, configuración general, título tag vacío', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates the metadata title as empty
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingMetaTitle).clear();
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 104: configuración general: descripción de metadata 499 caracteres
  it('login, configuración general, descripción metadata 499 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata description with 499 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingsMetaDescription).clear().type(mockapi[getRandom(mockapi.length)].text_499, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 105: configuración general: descripción de matadata 500 caracteres
  it('login, configuración general, descripción metadata 500 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata description with 500 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingsMetaDescription).clear().type(mockapi[getRandom(mockapi.length)].text_500, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 106: configuración general: descripción de metadata 501 caracteres
  it('login, configuración general, descripción de metadata 501 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata description with 501 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingsMetaDescription).clear().type(mockapi[getRandom(mockapi.length)].text_501, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 500 characters');
  });

  // 107: configuración general: social account url válida
  it('login, configuración general, social account url válida ', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates social account url with valid url
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(6).click();

    cy.get('input[type="url"]').eq(0).clear().type(aPrioriDataCharacter[ran].url, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 108: configuración general: social account url vacía
  it('login, configuración general, social account url vacía', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates social account with empty url
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(6).click();

    cy.get('input[type="url"]').eq(0).clear();
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 109: configuración general: título de metadata 299 caracteres
  it('login, configuración general, título de metadata 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata title with 299 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingMetaTitle).clear().type(mockapi[getRandom(mockapi.length)].text_299, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 110: configuración general: título de metadata 300 caracteres
  it('login, configuración general, título de metadata 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata title with 300 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingMetaTitle).clear().type(mockapi[getRandom(mockapi.length)].text_300, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 111: configuración general: título de metadata 301 caracteres
  it('login, configuración general, título de metadata 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates metadata title with 301 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(3).click();

    cy.get(settingMetaTitle).clear().type(mockapi[getRandom(mockapi.length)].text_301, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 300 characters');
  });

  // 112: configuración general: título de twitter 299 caracteres
  it('login, configuración general, título de twitter 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter title with 299 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterTitle).clear().type(mockapi[getRandom(mockapi.length)].text_299, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 113: configuración general: título de twitter 300 caracteres
  it('login, configuración general, título de twitter 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter title with 300 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterTitle).clear().type(mockapi[getRandom(mockapi.length)].text_300, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 114: configuración general: título de twitter 301 caracteres
  it('login, configuración general, título de twitter 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter title with 301 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterTitle).clear().type(mockapi[getRandom(mockapi.length)].text_301, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 300 characters');
  });

  // 115: configuración general: descripción de twitter 299 caracteres
  it('login, configuración general, descripción de twitter 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter description with 299 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterDescription).clear().type(mockapi[getRandom(mockapi.length)].text_299, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 116: configuración general: descripción de twitter 300 caracteres
  it('login, configuración general, descripción de twitter 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter description with 300 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterDescription).clear().type(mockapi[getRandom(mockapi.length)].text_300, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 117: configuración general: descripción de twitter 301 caracteres
  it('login, configuración general, descripción de twitter 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter description with 301 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(4).click();

    cy.get(settingsTwitterDescription).clear().type(mockapi[getRandom(mockapi.length)].text_301, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 300 characters');
  });

  // 118: configuración general: título de facebook 299 caracteres
  it('login, configuración general, título de facebook 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates facebook title with 299 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookTitle).clear().type(mockapi[getRandom(mockapi.length)].text_299, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 119: configuración general: título de facebook 300 caracteres
  it('login, configuración general, título de facebook 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates facebook title with 300 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookTitle).clear().type(mockapi[getRandom(mockapi.length)].text_300, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 120: configuración general: título de facebook 301 caracteres
  it('login, configuración general, título de facebook 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates facebook title with 301 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookTitle).clear().type(mockapi[getRandom(mockapi.length)].text_301, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 300 characters');
  });

  // 121: configuración general: descripción de facebook 299 caracteres
  it('login, configuración general, descripción de facebook 299 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates facebook description with 299 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookDescription).clear().type(mockapi[getRandom(mockapi.length)].text_299, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 122: configuración general: descripción de twitter 300 caracteres
  it('login, configuración general, descripción de twitter 300 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates twitter description with 300 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookDescription).clear().type(mockapi[getRandom(mockapi.length)].text_300, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN succesful saved shown
    cy.get(settingsSaveButtonSuccess).should('be.visible');
  });

  // 123: configuración general: descripción de facebook 301 caracteres
  it('login, configuración general, descripción de facebook 301 caracteres', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login      
    // WHEN the user updates facebook description with 301 characters
    cy.visit('http://localhost:2368/ghost');
    login(userName, userPassword);
    cy.get(btnSettings).click();
    cy.wait(1000);
    cy.get(btnSettingsGeneral).click();
    cy.get(expandButton).eq(5).click();

    cy.get(settingsFacebookDescription).clear().type(mockapi[getRandom(mockapi.length)].text_301, { force: true });
    cy.get(settingsSaveButton).click();

    // THEN error messages are shown
    cy.get(errorBar).invoke('text').should('include', 'exceeds maximum length of 300 characters');
  });

  //#endregion

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

});

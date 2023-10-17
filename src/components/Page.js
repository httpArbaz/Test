import {
  ActionList,
  AppProvider,
  LegacyCard,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Modal,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  Toast,
  TopBar,
  Card,
  InlineGrid,
  BlockStack,
  Box,
  Bleed,
  Divider,
  Pagination,
  RangeSlider,
  Tabs,
  Select,
  Checkbox,
  PageActions,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import {
  ArrowLeftMinor,
  HomeMajor,
  OrdersMajor,
  ConversationMinor,
} from "@shopify/polaris-icons";
import { useState, useCallback, useRef } from "react";

function FrameExample() {
  const defaultState = useRef({
    emailFieldValue: "dharma@jadedpixel.com",
    nameFieldValue: "Jaded Pixel",
  });

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue
  );
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const handleSubjectChange = useCallback(
    (value: string) => setSupportSubject(value),
    []
  );
  const handleMessageChange = useCallback(
    (value: string) => setSupportMessage(value),
    []
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleNameFieldChange = useCallback((value: string) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleEmailFieldChange = useCallback((value: string) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);
  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{ content: "Community forums" }],
    },
  ];

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Back to Shopify",
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Jaded Pixel App"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: toggleIsLoading,
          },
          {
            label: "Jaded Pixel Orders",
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: "Contact support",
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "Block",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Icons",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Style",
      panelID: "repeat-customers-content-1",
    },
  ];

  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  const options = [
    { label: "Bold", value: "Bold" },
    { label: "Regular", value: "Regular" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const actualPageMarkup = (
    <Page
      backAction={{ content: "Icon Block", url: "/" }}
      title="Icon Block"
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Tabs
        style={{
          width: "100px",
          color: "red",
        }}
        tabs={tabs}
      ></Tabs>
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <h1
                style={{
                  fontWeight: "600",
                }}
              >
                ICON SIZE
              </h1>

              <div
                style={{
                  display: "flex",
                }}
              >
                <input
                  style={{
                    width: "400px",
                    marginRight: "100px",
                  }}
                  type="range"
                  min="1"
                  max="100"
                />
                <input
                  type="number"
                  style={{
                    width: "50px",
                  }}
                />
              </div>
              <Divider />
              <h1
                style={{
                  fontWeight: "600",
                }}
              >
                COLORS
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h1>Background Color</h1>
                  <input
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                    }}
                    type="color"
                  />
                  <input type="text" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      marginLeft: "40px",
                    }}
                  >
                    Title Color
                  </h1>
                  <input
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                    }}
                    type="color"
                  />
                  <input type="text" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h1>Icon Color</h1>
                  <input
                    style={{
                      marginLeft: "10px",
                      borderRadius: "100px",
                      width: "30px",
                    }}
                    type="color"
                  />
                  <input type="text" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h1>Subtitle Color</h1>
                  <input
                    style={{
                      marginLeft: "10px",
                      borderRadius: "100px",
                      width: "30px",
                    }}
                    type="color"
                  />
                  <input type="text" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Checkbox checked={checked} onChange={handleChange} />
                <h1>Trasnparent Background</h1>
              </div>
              <Divider />
              <h1
                style={{
                  fontWeight: "600",
                }}
              >
                TYPOGRAPHY
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  <p>Title Font Size</p>
                  <input type="number" />
                </div>
                <div>
                  <Select
                    label="Title Font Size"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  <p>Title Font Size</p>
                  <input type="number" />
                </div>
                <div>
                  <Select
                    label="Subtitle Font Size"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
              </div>
              <Divider />
              <div>
                <h1
                  style={{
                    fontWeight: "600",
                  }}
                >
                  SPACING
                </h1>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    style={{
                      width: "400px",
                      marginRight: "100px",
                    }}
                    type="range"
                    min="1"
                    max="100"
                  />
                  <input
                    type="number"
                    style={{
                      width: "50px",
                    }}
                  />
                </div>
              </div>
              <h1
                style={{
                  fontWeight: "600",
                }}
              >
                BORDER LOCATION
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  <p>Goes Up</p>
                  <input type="number" />
                </div>
                <div>
                  <p>Goes Down</p>
                  <input type="number" />
                </div>
              </div>
              <div>
                <h1
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Space Between Block
                </h1>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    style={{
                      width: "400px",
                      marginRight: "100px",
                    }}
                    type="range"
                    min="1"
                    max="100"
                  />
                  <input
                    type="number"
                    style={{
                      width: "50px",
                    }}
                  />
                </div>
              </div>
            </BlockStack>
          </Card>
          <div>
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button variant="primary">Save</Button>
            </ButtonGroup>
          </div>
        </BlockStack>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <Box>
                <Bleed marginInline={{ xs: 400, sm: 500 }}></Bleed>
              </Box>
            </BlockStack>
          </Card>
        </BlockStack>
      </InlineGrid>
    </Page>
  );

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: "Send",
        onAction: toggleModalActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );

  const logo = {
    width: 124,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
    url: "#",
    accessibilityLabel: "Jaded Pixel",
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider
        i18n={{
          Polaris: {
            Avatar: {
              label: "Avatar",
              labelWithInitials: "Avatar with initials {initials}",
            },
            ContextualSaveBar: {
              save: "Save",
              discard: "Discard",
            },
            TextField: {
              characterCount: "{count} characters",
            },
            TopBar: {
              toggleMenuLabel: "Toggle menu",

              SearchField: {
                clearButtonLabel: "Clear",
                search: "Search",
              },
            },
            Modal: {
              iFrameTitle: "body markup",
            },
            Frame: {
              skipToContent: "Skip to content",
              navigationLabel: "Navigation",
              Navigation: {
                closeMobileNavigationLabel: "Close navigation",
              },
            },
          },
        }}
      >
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
          {modalMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}

export default FrameExample;

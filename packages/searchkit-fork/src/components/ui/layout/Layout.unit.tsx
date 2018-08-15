import * as React from "react";
import {mount} from "enzyme";
import {ActionBar, ActionBarRow, Layout, LayoutBody, LayoutResults, SideBar, TopBar} from "./Layout"

describe("Layout components", () => {

  it("should render correctly", () => {

    this.wrapper = mount(
      <div>
        <Layout size="m">
          <TopBar>search bar</TopBar>

          <LayoutBody>
            <SideBar>
              filters
            </SideBar>

            <LayoutResults>
              <ActionBar>
                <ActionBarRow>row 1</ActionBarRow>
                <ActionBarRow>row 2</ActionBarRow>
              </ActionBar>
              <p>hits</p>
            </LayoutResults>

          </LayoutBody>
        </Layout>
      </div>
    )

    expect(this.wrapper).toMatchSnapshot()

  })

  it("layout - no size prop", () => {
    this.wrapper = mount(
      <div>
        <Layout>
          content
        </Layout>
      </div>
    )

    expect(this.wrapper).toMatchSnapshot()

  })


})

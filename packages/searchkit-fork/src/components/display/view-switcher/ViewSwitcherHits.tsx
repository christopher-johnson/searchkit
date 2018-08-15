import * as React from "react";
import * as PropTypes from "prop-types"
import {RenderComponentPropType, RenderComponentType, SearchkitComponent, ViewOptionsAccessor} from "../../../core"

import {HitItemProps, Hits, HitsListProps, HitsProps} from "../../"

const defaults = require("lodash/defaults")

export interface ViewSwitcherHitsProps extends HitsProps {
  hitComponents?: Array<{
    key: string,
    title: string,
    itemComponent?: RenderComponentType<HitItemProps>,
    listComponent?: RenderComponentType<HitsListProps>,
    defaultOption?: boolean
  }>
}

export class ViewSwitcherHits extends SearchkitComponent<ViewSwitcherHitsProps, any> {
  static propTypes = defaults({
    hitComponents: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        itemComponent: RenderComponentPropType,
        listComponent: RenderComponentPropType,
        defaultOption: PropTypes.bool
      })
    )
  }, Hits.propTypes)
  accessor: ViewOptionsAccessor

  defineAccessor() {
    return new ViewOptionsAccessor("view", this.props.hitComponents)
  }

  render() {
    const selectedOption = this.accessor.getSelectedOption()
    const props = {
      ...this.props,
      itemComponent: selectedOption.itemComponent,
      listComponent: selectedOption.listComponent,
      mod: 'sk-hits-' + selectedOption.key
    }
    return (
      <Hits {...props} />
    )
  }
}

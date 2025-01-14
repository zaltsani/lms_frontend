import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react"

const AppBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href} >{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 !== items.length && <BreadcrumbSeparator />}
          </Fragment>
        ))}
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default AppBreadcrumb
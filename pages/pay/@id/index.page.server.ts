import { PageContextServer, PageProps } from "../../../renderer/types";
import { pbApi } from "../../../helpers/pocketbase";

export { getDocumentProps, onBeforeRender };

const getDocumentProps = (pageProps: PageProps<{ order: Order }>) => ({
  title: `Order #${pageProps.order.id}`,
  desc: "Please pay for your order",
});

const onBeforeRender = async (pageContext: PageContextServer) => {
  if (!pageContext.routeParams) {
    return {
      pageContext: {
        is404: true,
      },
    };
  }

  try {
    const { data: order } = await pbApi.get(
      `/api/collections/orders/records/${pageContext.routeParams.id}`
    );

    const pageProps = {
      order,
    };

    return {
      pageContext: {
        pageProps,
      },
    };
  } catch (error) {
    return {
      pageContext: {
        is404: true,
      },
    };
  }
};

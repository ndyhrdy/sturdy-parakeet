import { PageContextServer } from "../../../renderer/types";
import { pbApi } from "../../../helpers/pocketbase";

export { onBeforeRender };

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

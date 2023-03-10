import { withTokenSsr } from 'utils/withToken';

function CartPage() {
  return <h1>cart</h1>;
}

export default CartPage;

export const getServerSideProps = withTokenSsr(function getServerSideProps({
  req
}) {
  return { props: {} };
});

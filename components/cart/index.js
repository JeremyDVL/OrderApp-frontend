/* eslint-disable react/no-unknown-property */
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, CardTitle, Badge } from 'reactstrap';

import AppContext from '../../context/AppContext';

function Cart() {
	const appContext = useContext(AppContext);
	const router = useRouter();

	const { cart, isAuthenticated } = appContext;

	return (
		<div>
			<Card style={{ padding: '10px 5px', width: 375 }} className="mx-auto">
				<CardTitle style={{ marginLeft: 50, fontWeight: 500, fontSize: 30 }}>Your Order</CardTitle>
				<hr />
				<CardBody style={{ padding: 10 }}>
					<div style={{ marginBottom: 6 }}>
						<medium>Items:</medium>
					</div>
					<div>
						{cart.items
							? cart.items.map(item => {
									if (item.quantity > 0) {
										return (
											<div
												className="items-one"
												style={{ marginBottom: 15 }}
												key={Math.random()}
											>
												<div>
													<span id="item-price">
														&nbsp; $
														{
															item.res.attributes
																.price
														}
														&nbsp;{' '}
														{
															item.res.attributes
																.name
														}
													</span>
													<Button
														style={{
															height: 20,
															padding: 0,
															width: 20,
															marginRight: 5,
															marginLeft: 10,
														}}
														onClick={() =>
															appContext.addItem(
																item
															)
														}
														color="link"
													>
														+
													</Button>
													<Button
														style={{
															height: 20,
															padding: 0,
															width: 20,
															marginRight: 10,
														}}
														onClick={() =>
															appContext.removeItem(
																item
															)
														}
														color="link"
													>
														-
													</Button>
													<span
														style={{
															marginLeft: 5,
														}}
														id="item-quantity"
													>
														{item.quantity}x
													</span>
												</div>
											</div>
										);
									}
							  })
							: null}
						{isAuthenticated ? (
							cart.items.length > 0 ? (
								<div>
									<Badge
										style={{ width: 200, padding: 10 }}
										color="dark"
									>
										<h5
											style={{
												fontWeight: 100,
												color: 'white',
											}}
										>
											Total:
											${appContext.cart.total.toFixed(2)}
										</h5>
									</Badge>

									<div
										style={{
											marginTop: 10,
											marginRight: 10,
										}}
									>
										<Link href="/checkout">
											<Button
												style={{ width: '50%' }}
												color="primary"
											>
												<a>Order</a>
											</Button>
										</Link>
									</div>
								</div>
							) : (
								<>
									{router.pathname === '/checkout' && (
										<small
											style={{ color: 'blue' }}
											onClick={() =>
												window.history.back()
											}
										>
											Back to Restaurant
										</small>
									)}
								</>
							)
						) : (
							<h5>Login to Order</h5>
						)}
					</div>
				</CardBody>
			</Card>
			<style jsx>{`
				#item-price {
					font-size: 1em;
					color: rgba(97, 97, 97, 1);
				}
				#item-quantity {
					font-size: 0.95em;
					padding-bottom: 4px;
					color: rgba(158, 158, 158, 1);
				}
				#item-name {
					font-size: 1em;
					color: rgba(97, 97, 97, 1);
				}
			`}</style>
		</div>
	);
}
export default Cart;

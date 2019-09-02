import { getCurrencyData } from "../shared";
import { createData, actionsData, createExpectedActions } from "../__mocks__/data";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// mock store with thunk
const middlewares = [thunk];

// create mock store
const mockStore = configureStore(middlewares);

// Empty state to initialize mock store
const initialState = {};
let store, data;

describe("action", () => {
	describe("shared :: getCurrencyData", () => {
		beforeEach(() => {
			fetch.resetMocks();
			data = createData({rates: {USD: 1}});
			store = mockStore(initialState);
		});
		describe("Successful fetch request", () => {
			it("should dispatch the correct actions", () => {
				const expectedActions = createExpectedActions({
					show: actionsData["show"],
					date: actionsData["date"],
					rates: actionsData["rates"],
					hide: actionsData["hide"]
				});
				fetch.mockResponse(JSON.stringify(data));
				return store.dispatch(getCurrencyData()).then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
			});
		});
		describe("Unsuccessful fetch request", () => {
			it("should dispatch the correct actions", () => {
				const expectedActions = createExpectedActions({
					show: actionsData["show"],
					hide: actionsData["hide"]
				});
				fetch.mockReject(new Error("fake error message"));
				return store.dispatch(getCurrencyData()).then(() => {
					expect(store.getActions()).toEqual(expectedActions);
				});
			});
		});
	});
});

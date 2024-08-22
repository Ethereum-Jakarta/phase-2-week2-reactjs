type SavedTokens = {
  access: { token: string, expire: string },
  refresh: { token: string, expire: string }
}

type ApiResponse<T extends object> = {
  code: number,
  message: string,
} & T;

type UserSchema = {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImageId?: string | null;
  role: "User" | "Admin";
  isEmailVerified: boolean;
  updatedAt: string;
  createdAt: string;
};

type PaginationSchema<T extends object> = {
  index: number;
  numOfPages: number;
  datas: T;
};

type ProductSchema = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const storageVar = "uwuT0k3enAlize780";

export default class ApiClient {
  public static baseUrl = "https://inventory-system-flame-five.vercel.app/v1";

  #accessToken
  #refreshToken
  #accessExpiration
  #refreshExpiration
  public constructor(
    accessToken: string,
    refreshToken: string,
    accessExpiration: Date,
    refreshExpiration: Date
  ) {
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
    this.#accessExpiration = accessExpiration;
    this.#refreshExpiration = refreshExpiration;
  }

  public async fetch(path: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET", body: unknown = undefined): Promise<Response> {
    const isForm = body instanceof FormData;
    const reqInit = {
      method,
      headers: {
        Authorization: `Bearer ${this.#accessToken}`,
      },
    } as any;
    let response;
    if (!isForm) reqInit.headers["Content-Type"] = "application/json";
    if (body) reqInit.body = isForm ? body : JSON.stringify(body);
    try {
       response = await fetch(`${ApiClient.baseUrl}/${path}`, reqInit);
    } catch (e) {
      throw e;
    }

    if (!response.ok) {
      const body2 = await response.json();
      if (body2.message !== "Please authenticate") throw Error(body2.message);
      const success = await this.refreshAccessToken();
      if (!success) throw new Error("must login");
      return this.fetch(path, method, body);
    }

    return response;
  }

  private async refreshAccessToken() {
    const response = await fetch(`${ApiClient.baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: this.#refreshToken })
    });
    if (!response.ok) return false;
    const body = await response.json();
    this.#accessToken = body.data.token;
    this.#accessExpiration = new Date(body.data.expires);
    this.saveToken();
    return true;
  }

  public saveToken() {
    const data: SavedTokens = {
      refresh: {
        token: this.#refreshToken,
        expire: this.#refreshExpiration.toISOString()
      },
      access: {
        token: this.#accessToken,
        expire: this.#accessExpiration.toISOString()
      }
    }
    localStorage.setItem(storageVar, JSON.stringify(data));
    return this;
  }

  public async fetchProfile() {
    return this
      .fetch("self")
      .then(x =>x.json()) as Promise<ApiResponse<{data: UserSchema}>>;
  }

  public async editProfile(name?: string, email?: string, password?: string) {
    return this
      .fetch("self", "PUT", {
        name,
        email,
        password
      });
  }

  public async fetchAllProducts(page: number, size: number) {
    return this
      .fetch(`products?pageSize=${size}&pageIndex=${page}`)
      .then(x => x.json()) as Promise<ApiResponse<{ data: PaginationSchema<(ProductSchema & { category: { name: string; }})[]> }>>;
  }

  public async fetchMyProducts(page: number, size: number) {
    return this
      .fetch(`products?pageSize=${size}&pageIndex=${page}`)
      .then(x => x.json() as Promise<ApiResponse<{ data: PaginationSchema<(ProductSchema & { category: { name: string; }})[]>}>>)
  }

  public async fetchCategories() {
    return this
      .fetch(`categories?pageSize=100&pageIndex=1`)
      .then(x => x.json() as Promise<ApiResponse<{ data: PaginationSchema<{ id: string; name: string; }[]>; }>>)
  }

  public async uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const response = await this.fetch("upload", "POST", form).then(x => x.json());
    return response.urls[0].src;
  }

  public static initFromStorage() {
    const savedStr = localStorage.getItem(storageVar);
    if (!savedStr) return null;
    const data: SavedTokens = JSON.parse(savedStr);
    return new ApiClient(
      data.access.token,
      data.refresh.token,
      new Date(data.access.expire),
      new Date(data.refresh.expire)
    );
  }

  public static async login(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    }).then(x => x.json());
    if (response.code !== 200) throw new Error(response.code === 500 ? "server error, try again later" : response.message);
    const { access, refresh } = response.data.tokens;
    return new this(
      access.token,
      refresh.token,
      new Date(access.expires),
      new Date(refresh.expires)
    ).saveToken();
  }

  public static async register(name: string, email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password, name
      })
    }).then(x => x.json());
    if (response.code !== 201) throw new Error(response.code === 500 ? "server error, try again later" : response.message);
    const { access, refresh } = response.data.tokens;
    return new this(
      access.token,
      refresh.token,
      new Date(access.expires),
      new Date(refresh.expires)
    ).saveToken();
  }

  public static async logout(email: string) {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
      })
    }).then(x => x.json())

    if (response.code !== 200) throw new Error(response.code === 500 ? "server error, try again later" : response.message);
    localStorage.removeItem(storageVar);
  }

  public static async verify(token: string) {
    const response = await fetch(`${this.baseUrl}/auth/email-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    }).then (x => x.json())
    return response;
  }
}

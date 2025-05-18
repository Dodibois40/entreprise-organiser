
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Affaire
 * 
 */
export type Affaire = $Result.DefaultSelection<Prisma.$AffairePayload>
/**
 * Model CategorieAchat
 * 
 */
export type CategorieAchat = $Result.DefaultSelection<Prisma.$CategorieAchatPayload>
/**
 * Model Bdc
 * 
 */
export type Bdc = $Result.DefaultSelection<Prisma.$BdcPayload>
/**
 * Model Pointage
 * 
 */
export type Pointage = $Result.DefaultSelection<Prisma.$PointagePayload>
/**
 * Model ParametreGlobal
 * 
 */
export type ParametreGlobal = $Result.DefaultSelection<Prisma.$ParametreGlobalPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StatutAffaire: {
  PLANIFIEE: 'PLANIFIEE',
  EN_COURS: 'EN_COURS',
  TERMINEE: 'TERMINEE',
  CLOTUREE: 'CLOTUREE'
};

export type StatutAffaire = (typeof StatutAffaire)[keyof typeof StatutAffaire]


export const TypeHeure: {
  FAB: 'FAB',
  SER: 'SER',
  POSE: 'POSE'
};

export type TypeHeure = (typeof TypeHeure)[keyof typeof TypeHeure]


export const RoleEnum: {
  ADMIN_SYS: 'ADMIN_SYS',
  CHARGE_AFFAIRE: 'CHARGE_AFFAIRE',
  ACHETEUR: 'ACHETEUR',
  CHEF_ATELIER: 'CHEF_ATELIER',
  CONSULTATION: 'CONSULTATION'
};

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]

}

export type StatutAffaire = $Enums.StatutAffaire

export const StatutAffaire: typeof $Enums.StatutAffaire

export type TypeHeure = $Enums.TypeHeure

export const TypeHeure: typeof $Enums.TypeHeure

export type RoleEnum = $Enums.RoleEnum

export const RoleEnum: typeof $Enums.RoleEnum

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Affaires
 * const affaires = await prisma.affaire.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Affaires
   * const affaires = await prisma.affaire.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.affaire`: Exposes CRUD operations for the **Affaire** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Affaires
    * const affaires = await prisma.affaire.findMany()
    * ```
    */
  get affaire(): Prisma.AffaireDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categorieAchat`: Exposes CRUD operations for the **CategorieAchat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategorieAchats
    * const categorieAchats = await prisma.categorieAchat.findMany()
    * ```
    */
  get categorieAchat(): Prisma.CategorieAchatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bdc`: Exposes CRUD operations for the **Bdc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bdcs
    * const bdcs = await prisma.bdc.findMany()
    * ```
    */
  get bdc(): Prisma.BdcDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pointage`: Exposes CRUD operations for the **Pointage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pointages
    * const pointages = await prisma.pointage.findMany()
    * ```
    */
  get pointage(): Prisma.PointageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parametreGlobal`: Exposes CRUD operations for the **ParametreGlobal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParametreGlobals
    * const parametreGlobals = await prisma.parametreGlobal.findMany()
    * ```
    */
  get parametreGlobal(): Prisma.ParametreGlobalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Affaire: 'Affaire',
    CategorieAchat: 'CategorieAchat',
    Bdc: 'Bdc',
    Pointage: 'Pointage',
    ParametreGlobal: 'ParametreGlobal',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "affaire" | "categorieAchat" | "bdc" | "pointage" | "parametreGlobal" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Affaire: {
        payload: Prisma.$AffairePayload<ExtArgs>
        fields: Prisma.AffaireFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffaireFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffaireFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          findFirst: {
            args: Prisma.AffaireFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffaireFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          findMany: {
            args: Prisma.AffaireFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>[]
          }
          create: {
            args: Prisma.AffaireCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          createMany: {
            args: Prisma.AffaireCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffaireCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>[]
          }
          delete: {
            args: Prisma.AffaireDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          update: {
            args: Prisma.AffaireUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          deleteMany: {
            args: Prisma.AffaireDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffaireUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffaireUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>[]
          }
          upsert: {
            args: Prisma.AffaireUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffairePayload>
          }
          aggregate: {
            args: Prisma.AffaireAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffaire>
          }
          groupBy: {
            args: Prisma.AffaireGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffaireGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffaireCountArgs<ExtArgs>
            result: $Utils.Optional<AffaireCountAggregateOutputType> | number
          }
        }
      }
      CategorieAchat: {
        payload: Prisma.$CategorieAchatPayload<ExtArgs>
        fields: Prisma.CategorieAchatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategorieAchatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategorieAchatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          findFirst: {
            args: Prisma.CategorieAchatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategorieAchatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          findMany: {
            args: Prisma.CategorieAchatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>[]
          }
          create: {
            args: Prisma.CategorieAchatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          createMany: {
            args: Prisma.CategorieAchatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategorieAchatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>[]
          }
          delete: {
            args: Prisma.CategorieAchatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          update: {
            args: Prisma.CategorieAchatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          deleteMany: {
            args: Prisma.CategorieAchatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategorieAchatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategorieAchatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>[]
          }
          upsert: {
            args: Prisma.CategorieAchatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategorieAchatPayload>
          }
          aggregate: {
            args: Prisma.CategorieAchatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategorieAchat>
          }
          groupBy: {
            args: Prisma.CategorieAchatGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategorieAchatGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategorieAchatCountArgs<ExtArgs>
            result: $Utils.Optional<CategorieAchatCountAggregateOutputType> | number
          }
        }
      }
      Bdc: {
        payload: Prisma.$BdcPayload<ExtArgs>
        fields: Prisma.BdcFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BdcFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BdcFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          findFirst: {
            args: Prisma.BdcFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BdcFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          findMany: {
            args: Prisma.BdcFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>[]
          }
          create: {
            args: Prisma.BdcCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          createMany: {
            args: Prisma.BdcCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BdcCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>[]
          }
          delete: {
            args: Prisma.BdcDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          update: {
            args: Prisma.BdcUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          deleteMany: {
            args: Prisma.BdcDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BdcUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BdcUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>[]
          }
          upsert: {
            args: Prisma.BdcUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BdcPayload>
          }
          aggregate: {
            args: Prisma.BdcAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBdc>
          }
          groupBy: {
            args: Prisma.BdcGroupByArgs<ExtArgs>
            result: $Utils.Optional<BdcGroupByOutputType>[]
          }
          count: {
            args: Prisma.BdcCountArgs<ExtArgs>
            result: $Utils.Optional<BdcCountAggregateOutputType> | number
          }
        }
      }
      Pointage: {
        payload: Prisma.$PointagePayload<ExtArgs>
        fields: Prisma.PointageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          findFirst: {
            args: Prisma.PointageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          findMany: {
            args: Prisma.PointageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>[]
          }
          create: {
            args: Prisma.PointageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          createMany: {
            args: Prisma.PointageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>[]
          }
          delete: {
            args: Prisma.PointageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          update: {
            args: Prisma.PointageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          deleteMany: {
            args: Prisma.PointageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PointageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>[]
          }
          upsert: {
            args: Prisma.PointageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointagePayload>
          }
          aggregate: {
            args: Prisma.PointageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointage>
          }
          groupBy: {
            args: Prisma.PointageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointageCountArgs<ExtArgs>
            result: $Utils.Optional<PointageCountAggregateOutputType> | number
          }
        }
      }
      ParametreGlobal: {
        payload: Prisma.$ParametreGlobalPayload<ExtArgs>
        fields: Prisma.ParametreGlobalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParametreGlobalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParametreGlobalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          findFirst: {
            args: Prisma.ParametreGlobalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParametreGlobalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          findMany: {
            args: Prisma.ParametreGlobalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>[]
          }
          create: {
            args: Prisma.ParametreGlobalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          createMany: {
            args: Prisma.ParametreGlobalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParametreGlobalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>[]
          }
          delete: {
            args: Prisma.ParametreGlobalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          update: {
            args: Prisma.ParametreGlobalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          deleteMany: {
            args: Prisma.ParametreGlobalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParametreGlobalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParametreGlobalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>[]
          }
          upsert: {
            args: Prisma.ParametreGlobalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametreGlobalPayload>
          }
          aggregate: {
            args: Prisma.ParametreGlobalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParametreGlobal>
          }
          groupBy: {
            args: Prisma.ParametreGlobalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParametreGlobalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParametreGlobalCountArgs<ExtArgs>
            result: $Utils.Optional<ParametreGlobalCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    affaire?: AffaireOmit
    categorieAchat?: CategorieAchatOmit
    bdc?: BdcOmit
    pointage?: PointageOmit
    parametreGlobal?: ParametreGlobalOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AffaireCountOutputType
   */

  export type AffaireCountOutputType = {
    bdc: number
    pointages: number
  }

  export type AffaireCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bdc?: boolean | AffaireCountOutputTypeCountBdcArgs
    pointages?: boolean | AffaireCountOutputTypeCountPointagesArgs
  }

  // Custom InputTypes
  /**
   * AffaireCountOutputType without action
   */
  export type AffaireCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffaireCountOutputType
     */
    select?: AffaireCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AffaireCountOutputType without action
   */
  export type AffaireCountOutputTypeCountBdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BdcWhereInput
  }

  /**
   * AffaireCountOutputType without action
   */
  export type AffaireCountOutputTypeCountPointagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointageWhereInput
  }


  /**
   * Count Type CategorieAchatCountOutputType
   */

  export type CategorieAchatCountOutputType = {
    bdc: number
  }

  export type CategorieAchatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bdc?: boolean | CategorieAchatCountOutputTypeCountBdcArgs
  }

  // Custom InputTypes
  /**
   * CategorieAchatCountOutputType without action
   */
  export type CategorieAchatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchatCountOutputType
     */
    select?: CategorieAchatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategorieAchatCountOutputType without action
   */
  export type CategorieAchatCountOutputTypeCountBdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BdcWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    pointages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointages?: boolean | UserCountOutputTypeCountPointagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPointagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Affaire
   */

  export type AggregateAffaire = {
    _count: AffaireCountAggregateOutputType | null
    _avg: AffaireAvgAggregateOutputType | null
    _sum: AffaireSumAggregateOutputType | null
    _min: AffaireMinAggregateOutputType | null
    _max: AffaireMaxAggregateOutputType | null
  }

  export type AffaireAvgAggregateOutputType = {
    objectifCaHt: number | null
    objectifAchatHt: number | null
    objectifHeuresFab: number | null
    ser: number | null
    pose: number | null
  }

  export type AffaireSumAggregateOutputType = {
    objectifCaHt: number | null
    objectifAchatHt: number | null
    objectifHeuresFab: number | null
    ser: number | null
    pose: number | null
  }

  export type AffaireMinAggregateOutputType = {
    id: string | null
    numero: string | null
    libelle: string | null
    client: string | null
    adresse: string | null
    dateCreation: Date | null
    dateCloturePrevue: Date | null
    objectifCaHt: number | null
    objectifAchatHt: number | null
    objectifHeuresFab: number | null
    ser: number | null
    pose: number | null
    statut: $Enums.StatutAffaire | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffaireMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    libelle: string | null
    client: string | null
    adresse: string | null
    dateCreation: Date | null
    dateCloturePrevue: Date | null
    objectifCaHt: number | null
    objectifAchatHt: number | null
    objectifHeuresFab: number | null
    ser: number | null
    pose: number | null
    statut: $Enums.StatutAffaire | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffaireCountAggregateOutputType = {
    id: number
    numero: number
    libelle: number
    client: number
    adresse: number
    dateCreation: number
    dateCloturePrevue: number
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser: number
    pose: number
    statut: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffaireAvgAggregateInputType = {
    objectifCaHt?: true
    objectifAchatHt?: true
    objectifHeuresFab?: true
    ser?: true
    pose?: true
  }

  export type AffaireSumAggregateInputType = {
    objectifCaHt?: true
    objectifAchatHt?: true
    objectifHeuresFab?: true
    ser?: true
    pose?: true
  }

  export type AffaireMinAggregateInputType = {
    id?: true
    numero?: true
    libelle?: true
    client?: true
    adresse?: true
    dateCreation?: true
    dateCloturePrevue?: true
    objectifCaHt?: true
    objectifAchatHt?: true
    objectifHeuresFab?: true
    ser?: true
    pose?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffaireMaxAggregateInputType = {
    id?: true
    numero?: true
    libelle?: true
    client?: true
    adresse?: true
    dateCreation?: true
    dateCloturePrevue?: true
    objectifCaHt?: true
    objectifAchatHt?: true
    objectifHeuresFab?: true
    ser?: true
    pose?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffaireCountAggregateInputType = {
    id?: true
    numero?: true
    libelle?: true
    client?: true
    adresse?: true
    dateCreation?: true
    dateCloturePrevue?: true
    objectifCaHt?: true
    objectifAchatHt?: true
    objectifHeuresFab?: true
    ser?: true
    pose?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffaireAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affaire to aggregate.
     */
    where?: AffaireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affaires to fetch.
     */
    orderBy?: AffaireOrderByWithRelationInput | AffaireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffaireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affaires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affaires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Affaires
    **/
    _count?: true | AffaireCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffaireAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffaireSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffaireMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffaireMaxAggregateInputType
  }

  export type GetAffaireAggregateType<T extends AffaireAggregateArgs> = {
        [P in keyof T & keyof AggregateAffaire]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffaire[P]>
      : GetScalarType<T[P], AggregateAffaire[P]>
  }




  export type AffaireGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffaireWhereInput
    orderBy?: AffaireOrderByWithAggregationInput | AffaireOrderByWithAggregationInput[]
    by: AffaireScalarFieldEnum[] | AffaireScalarFieldEnum
    having?: AffaireScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffaireCountAggregateInputType | true
    _avg?: AffaireAvgAggregateInputType
    _sum?: AffaireSumAggregateInputType
    _min?: AffaireMinAggregateInputType
    _max?: AffaireMaxAggregateInputType
  }

  export type AffaireGroupByOutputType = {
    id: string
    numero: string
    libelle: string
    client: string
    adresse: string | null
    dateCreation: Date
    dateCloturePrevue: Date | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser: number
    pose: number
    statut: $Enums.StatutAffaire
    createdAt: Date
    updatedAt: Date
    _count: AffaireCountAggregateOutputType | null
    _avg: AffaireAvgAggregateOutputType | null
    _sum: AffaireSumAggregateOutputType | null
    _min: AffaireMinAggregateOutputType | null
    _max: AffaireMaxAggregateOutputType | null
  }

  type GetAffaireGroupByPayload<T extends AffaireGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffaireGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffaireGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffaireGroupByOutputType[P]>
            : GetScalarType<T[P], AffaireGroupByOutputType[P]>
        }
      >
    >


  export type AffaireSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    libelle?: boolean
    client?: boolean
    adresse?: boolean
    dateCreation?: boolean
    dateCloturePrevue?: boolean
    objectifCaHt?: boolean
    objectifAchatHt?: boolean
    objectifHeuresFab?: boolean
    ser?: boolean
    pose?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bdc?: boolean | Affaire$bdcArgs<ExtArgs>
    pointages?: boolean | Affaire$pointagesArgs<ExtArgs>
    _count?: boolean | AffaireCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    libelle?: boolean
    client?: boolean
    adresse?: boolean
    dateCreation?: boolean
    dateCloturePrevue?: boolean
    objectifCaHt?: boolean
    objectifAchatHt?: boolean
    objectifHeuresFab?: boolean
    ser?: boolean
    pose?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    libelle?: boolean
    client?: boolean
    adresse?: boolean
    dateCreation?: boolean
    dateCloturePrevue?: boolean
    objectifCaHt?: boolean
    objectifAchatHt?: boolean
    objectifHeuresFab?: boolean
    ser?: boolean
    pose?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectScalar = {
    id?: boolean
    numero?: boolean
    libelle?: boolean
    client?: boolean
    adresse?: boolean
    dateCreation?: boolean
    dateCloturePrevue?: boolean
    objectifCaHt?: boolean
    objectifAchatHt?: boolean
    objectifHeuresFab?: boolean
    ser?: boolean
    pose?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffaireOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "libelle" | "client" | "adresse" | "dateCreation" | "dateCloturePrevue" | "objectifCaHt" | "objectifAchatHt" | "objectifHeuresFab" | "ser" | "pose" | "statut" | "createdAt" | "updatedAt", ExtArgs["result"]["affaire"]>
  export type AffaireInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bdc?: boolean | Affaire$bdcArgs<ExtArgs>
    pointages?: boolean | Affaire$pointagesArgs<ExtArgs>
    _count?: boolean | AffaireCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AffaireIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AffaireIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AffairePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Affaire"
    objects: {
      bdc: Prisma.$BdcPayload<ExtArgs>[]
      pointages: Prisma.$PointagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      libelle: string
      client: string
      adresse: string | null
      dateCreation: Date
      dateCloturePrevue: Date | null
      objectifCaHt: number
      objectifAchatHt: number
      objectifHeuresFab: number
      ser: number
      pose: number
      statut: $Enums.StatutAffaire
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affaire"]>
    composites: {}
  }

  type AffaireGetPayload<S extends boolean | null | undefined | AffaireDefaultArgs> = $Result.GetResult<Prisma.$AffairePayload, S>

  type AffaireCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffaireFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffaireCountAggregateInputType | true
    }

  export interface AffaireDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Affaire'], meta: { name: 'Affaire' } }
    /**
     * Find zero or one Affaire that matches the filter.
     * @param {AffaireFindUniqueArgs} args - Arguments to find a Affaire
     * @example
     * // Get one Affaire
     * const affaire = await prisma.affaire.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffaireFindUniqueArgs>(args: SelectSubset<T, AffaireFindUniqueArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Affaire that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffaireFindUniqueOrThrowArgs} args - Arguments to find a Affaire
     * @example
     * // Get one Affaire
     * const affaire = await prisma.affaire.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffaireFindUniqueOrThrowArgs>(args: SelectSubset<T, AffaireFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affaire that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireFindFirstArgs} args - Arguments to find a Affaire
     * @example
     * // Get one Affaire
     * const affaire = await prisma.affaire.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffaireFindFirstArgs>(args?: SelectSubset<T, AffaireFindFirstArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affaire that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireFindFirstOrThrowArgs} args - Arguments to find a Affaire
     * @example
     * // Get one Affaire
     * const affaire = await prisma.affaire.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffaireFindFirstOrThrowArgs>(args?: SelectSubset<T, AffaireFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Affaires that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Affaires
     * const affaires = await prisma.affaire.findMany()
     * 
     * // Get first 10 Affaires
     * const affaires = await prisma.affaire.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affaireWithIdOnly = await prisma.affaire.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffaireFindManyArgs>(args?: SelectSubset<T, AffaireFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Affaire.
     * @param {AffaireCreateArgs} args - Arguments to create a Affaire.
     * @example
     * // Create one Affaire
     * const Affaire = await prisma.affaire.create({
     *   data: {
     *     // ... data to create a Affaire
     *   }
     * })
     * 
     */
    create<T extends AffaireCreateArgs>(args: SelectSubset<T, AffaireCreateArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Affaires.
     * @param {AffaireCreateManyArgs} args - Arguments to create many Affaires.
     * @example
     * // Create many Affaires
     * const affaire = await prisma.affaire.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffaireCreateManyArgs>(args?: SelectSubset<T, AffaireCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Affaires and returns the data saved in the database.
     * @param {AffaireCreateManyAndReturnArgs} args - Arguments to create many Affaires.
     * @example
     * // Create many Affaires
     * const affaire = await prisma.affaire.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Affaires and only return the `id`
     * const affaireWithIdOnly = await prisma.affaire.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffaireCreateManyAndReturnArgs>(args?: SelectSubset<T, AffaireCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Affaire.
     * @param {AffaireDeleteArgs} args - Arguments to delete one Affaire.
     * @example
     * // Delete one Affaire
     * const Affaire = await prisma.affaire.delete({
     *   where: {
     *     // ... filter to delete one Affaire
     *   }
     * })
     * 
     */
    delete<T extends AffaireDeleteArgs>(args: SelectSubset<T, AffaireDeleteArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Affaire.
     * @param {AffaireUpdateArgs} args - Arguments to update one Affaire.
     * @example
     * // Update one Affaire
     * const affaire = await prisma.affaire.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffaireUpdateArgs>(args: SelectSubset<T, AffaireUpdateArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Affaires.
     * @param {AffaireDeleteManyArgs} args - Arguments to filter Affaires to delete.
     * @example
     * // Delete a few Affaires
     * const { count } = await prisma.affaire.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffaireDeleteManyArgs>(args?: SelectSubset<T, AffaireDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affaires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Affaires
     * const affaire = await prisma.affaire.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffaireUpdateManyArgs>(args: SelectSubset<T, AffaireUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affaires and returns the data updated in the database.
     * @param {AffaireUpdateManyAndReturnArgs} args - Arguments to update many Affaires.
     * @example
     * // Update many Affaires
     * const affaire = await prisma.affaire.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Affaires and only return the `id`
     * const affaireWithIdOnly = await prisma.affaire.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffaireUpdateManyAndReturnArgs>(args: SelectSubset<T, AffaireUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Affaire.
     * @param {AffaireUpsertArgs} args - Arguments to update or create a Affaire.
     * @example
     * // Update or create a Affaire
     * const affaire = await prisma.affaire.upsert({
     *   create: {
     *     // ... data to create a Affaire
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Affaire we want to update
     *   }
     * })
     */
    upsert<T extends AffaireUpsertArgs>(args: SelectSubset<T, AffaireUpsertArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Affaires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireCountArgs} args - Arguments to filter Affaires to count.
     * @example
     * // Count the number of Affaires
     * const count = await prisma.affaire.count({
     *   where: {
     *     // ... the filter for the Affaires we want to count
     *   }
     * })
    **/
    count<T extends AffaireCountArgs>(
      args?: Subset<T, AffaireCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffaireCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Affaire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffaireAggregateArgs>(args: Subset<T, AffaireAggregateArgs>): Prisma.PrismaPromise<GetAffaireAggregateType<T>>

    /**
     * Group by Affaire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffaireGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffaireGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffaireGroupByArgs['orderBy'] }
        : { orderBy?: AffaireGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffaireGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffaireGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Affaire model
   */
  readonly fields: AffaireFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Affaire.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffaireClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bdc<T extends Affaire$bdcArgs<ExtArgs> = {}>(args?: Subset<T, Affaire$bdcArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pointages<T extends Affaire$pointagesArgs<ExtArgs> = {}>(args?: Subset<T, Affaire$pointagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Affaire model
   */
  interface AffaireFieldRefs {
    readonly id: FieldRef<"Affaire", 'String'>
    readonly numero: FieldRef<"Affaire", 'String'>
    readonly libelle: FieldRef<"Affaire", 'String'>
    readonly client: FieldRef<"Affaire", 'String'>
    readonly adresse: FieldRef<"Affaire", 'String'>
    readonly dateCreation: FieldRef<"Affaire", 'DateTime'>
    readonly dateCloturePrevue: FieldRef<"Affaire", 'DateTime'>
    readonly objectifCaHt: FieldRef<"Affaire", 'Float'>
    readonly objectifAchatHt: FieldRef<"Affaire", 'Float'>
    readonly objectifHeuresFab: FieldRef<"Affaire", 'Float'>
    readonly ser: FieldRef<"Affaire", 'Float'>
    readonly pose: FieldRef<"Affaire", 'Float'>
    readonly statut: FieldRef<"Affaire", 'StatutAffaire'>
    readonly createdAt: FieldRef<"Affaire", 'DateTime'>
    readonly updatedAt: FieldRef<"Affaire", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Affaire findUnique
   */
  export type AffaireFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter, which Affaire to fetch.
     */
    where: AffaireWhereUniqueInput
  }

  /**
   * Affaire findUniqueOrThrow
   */
  export type AffaireFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter, which Affaire to fetch.
     */
    where: AffaireWhereUniqueInput
  }

  /**
   * Affaire findFirst
   */
  export type AffaireFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter, which Affaire to fetch.
     */
    where?: AffaireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affaires to fetch.
     */
    orderBy?: AffaireOrderByWithRelationInput | AffaireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affaires.
     */
    cursor?: AffaireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affaires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affaires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affaires.
     */
    distinct?: AffaireScalarFieldEnum | AffaireScalarFieldEnum[]
  }

  /**
   * Affaire findFirstOrThrow
   */
  export type AffaireFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter, which Affaire to fetch.
     */
    where?: AffaireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affaires to fetch.
     */
    orderBy?: AffaireOrderByWithRelationInput | AffaireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affaires.
     */
    cursor?: AffaireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affaires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affaires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affaires.
     */
    distinct?: AffaireScalarFieldEnum | AffaireScalarFieldEnum[]
  }

  /**
   * Affaire findMany
   */
  export type AffaireFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter, which Affaires to fetch.
     */
    where?: AffaireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affaires to fetch.
     */
    orderBy?: AffaireOrderByWithRelationInput | AffaireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Affaires.
     */
    cursor?: AffaireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affaires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affaires.
     */
    skip?: number
    distinct?: AffaireScalarFieldEnum | AffaireScalarFieldEnum[]
  }

  /**
   * Affaire create
   */
  export type AffaireCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * The data needed to create a Affaire.
     */
    data: XOR<AffaireCreateInput, AffaireUncheckedCreateInput>
  }

  /**
   * Affaire createMany
   */
  export type AffaireCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Affaires.
     */
    data: AffaireCreateManyInput | AffaireCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affaire createManyAndReturn
   */
  export type AffaireCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * The data used to create many Affaires.
     */
    data: AffaireCreateManyInput | AffaireCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affaire update
   */
  export type AffaireUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * The data needed to update a Affaire.
     */
    data: XOR<AffaireUpdateInput, AffaireUncheckedUpdateInput>
    /**
     * Choose, which Affaire to update.
     */
    where: AffaireWhereUniqueInput
  }

  /**
   * Affaire updateMany
   */
  export type AffaireUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Affaires.
     */
    data: XOR<AffaireUpdateManyMutationInput, AffaireUncheckedUpdateManyInput>
    /**
     * Filter which Affaires to update
     */
    where?: AffaireWhereInput
    /**
     * Limit how many Affaires to update.
     */
    limit?: number
  }

  /**
   * Affaire updateManyAndReturn
   */
  export type AffaireUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * The data used to update Affaires.
     */
    data: XOR<AffaireUpdateManyMutationInput, AffaireUncheckedUpdateManyInput>
    /**
     * Filter which Affaires to update
     */
    where?: AffaireWhereInput
    /**
     * Limit how many Affaires to update.
     */
    limit?: number
  }

  /**
   * Affaire upsert
   */
  export type AffaireUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * The filter to search for the Affaire to update in case it exists.
     */
    where: AffaireWhereUniqueInput
    /**
     * In case the Affaire found by the `where` argument doesn't exist, create a new Affaire with this data.
     */
    create: XOR<AffaireCreateInput, AffaireUncheckedCreateInput>
    /**
     * In case the Affaire was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffaireUpdateInput, AffaireUncheckedUpdateInput>
  }

  /**
   * Affaire delete
   */
  export type AffaireDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
    /**
     * Filter which Affaire to delete.
     */
    where: AffaireWhereUniqueInput
  }

  /**
   * Affaire deleteMany
   */
  export type AffaireDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affaires to delete
     */
    where?: AffaireWhereInput
    /**
     * Limit how many Affaires to delete.
     */
    limit?: number
  }

  /**
   * Affaire.bdc
   */
  export type Affaire$bdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    where?: BdcWhereInput
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    cursor?: BdcWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BdcScalarFieldEnum | BdcScalarFieldEnum[]
  }

  /**
   * Affaire.pointages
   */
  export type Affaire$pointagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    where?: PointageWhereInput
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    cursor?: PointageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointageScalarFieldEnum | PointageScalarFieldEnum[]
  }

  /**
   * Affaire without action
   */
  export type AffaireDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affaire
     */
    select?: AffaireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affaire
     */
    omit?: AffaireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireInclude<ExtArgs> | null
  }


  /**
   * Model CategorieAchat
   */

  export type AggregateCategorieAchat = {
    _count: CategorieAchatCountAggregateOutputType | null
    _avg: CategorieAchatAvgAggregateOutputType | null
    _sum: CategorieAchatSumAggregateOutputType | null
    _min: CategorieAchatMinAggregateOutputType | null
    _max: CategorieAchatMaxAggregateOutputType | null
  }

  export type CategorieAchatAvgAggregateOutputType = {
    pourcentageFg: number | null
  }

  export type CategorieAchatSumAggregateOutputType = {
    pourcentageFg: number | null
  }

  export type CategorieAchatMinAggregateOutputType = {
    id: string | null
    code: string | null
    intitule: string | null
    pourcentageFg: number | null
  }

  export type CategorieAchatMaxAggregateOutputType = {
    id: string | null
    code: string | null
    intitule: string | null
    pourcentageFg: number | null
  }

  export type CategorieAchatCountAggregateOutputType = {
    id: number
    code: number
    intitule: number
    pourcentageFg: number
    _all: number
  }


  export type CategorieAchatAvgAggregateInputType = {
    pourcentageFg?: true
  }

  export type CategorieAchatSumAggregateInputType = {
    pourcentageFg?: true
  }

  export type CategorieAchatMinAggregateInputType = {
    id?: true
    code?: true
    intitule?: true
    pourcentageFg?: true
  }

  export type CategorieAchatMaxAggregateInputType = {
    id?: true
    code?: true
    intitule?: true
    pourcentageFg?: true
  }

  export type CategorieAchatCountAggregateInputType = {
    id?: true
    code?: true
    intitule?: true
    pourcentageFg?: true
    _all?: true
  }

  export type CategorieAchatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategorieAchat to aggregate.
     */
    where?: CategorieAchatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategorieAchats to fetch.
     */
    orderBy?: CategorieAchatOrderByWithRelationInput | CategorieAchatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategorieAchatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategorieAchats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategorieAchats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategorieAchats
    **/
    _count?: true | CategorieAchatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategorieAchatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorieAchatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategorieAchatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategorieAchatMaxAggregateInputType
  }

  export type GetCategorieAchatAggregateType<T extends CategorieAchatAggregateArgs> = {
        [P in keyof T & keyof AggregateCategorieAchat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategorieAchat[P]>
      : GetScalarType<T[P], AggregateCategorieAchat[P]>
  }




  export type CategorieAchatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategorieAchatWhereInput
    orderBy?: CategorieAchatOrderByWithAggregationInput | CategorieAchatOrderByWithAggregationInput[]
    by: CategorieAchatScalarFieldEnum[] | CategorieAchatScalarFieldEnum
    having?: CategorieAchatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategorieAchatCountAggregateInputType | true
    _avg?: CategorieAchatAvgAggregateInputType
    _sum?: CategorieAchatSumAggregateInputType
    _min?: CategorieAchatMinAggregateInputType
    _max?: CategorieAchatMaxAggregateInputType
  }

  export type CategorieAchatGroupByOutputType = {
    id: string
    code: string
    intitule: string
    pourcentageFg: number
    _count: CategorieAchatCountAggregateOutputType | null
    _avg: CategorieAchatAvgAggregateOutputType | null
    _sum: CategorieAchatSumAggregateOutputType | null
    _min: CategorieAchatMinAggregateOutputType | null
    _max: CategorieAchatMaxAggregateOutputType | null
  }

  type GetCategorieAchatGroupByPayload<T extends CategorieAchatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategorieAchatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategorieAchatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategorieAchatGroupByOutputType[P]>
            : GetScalarType<T[P], CategorieAchatGroupByOutputType[P]>
        }
      >
    >


  export type CategorieAchatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    intitule?: boolean
    pourcentageFg?: boolean
    bdc?: boolean | CategorieAchat$bdcArgs<ExtArgs>
    _count?: boolean | CategorieAchatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorieAchat"]>

  export type CategorieAchatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    intitule?: boolean
    pourcentageFg?: boolean
  }, ExtArgs["result"]["categorieAchat"]>

  export type CategorieAchatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    intitule?: boolean
    pourcentageFg?: boolean
  }, ExtArgs["result"]["categorieAchat"]>

  export type CategorieAchatSelectScalar = {
    id?: boolean
    code?: boolean
    intitule?: boolean
    pourcentageFg?: boolean
  }

  export type CategorieAchatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "intitule" | "pourcentageFg", ExtArgs["result"]["categorieAchat"]>
  export type CategorieAchatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bdc?: boolean | CategorieAchat$bdcArgs<ExtArgs>
    _count?: boolean | CategorieAchatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategorieAchatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategorieAchatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategorieAchatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategorieAchat"
    objects: {
      bdc: Prisma.$BdcPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      intitule: string
      pourcentageFg: number
    }, ExtArgs["result"]["categorieAchat"]>
    composites: {}
  }

  type CategorieAchatGetPayload<S extends boolean | null | undefined | CategorieAchatDefaultArgs> = $Result.GetResult<Prisma.$CategorieAchatPayload, S>

  type CategorieAchatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategorieAchatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategorieAchatCountAggregateInputType | true
    }

  export interface CategorieAchatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategorieAchat'], meta: { name: 'CategorieAchat' } }
    /**
     * Find zero or one CategorieAchat that matches the filter.
     * @param {CategorieAchatFindUniqueArgs} args - Arguments to find a CategorieAchat
     * @example
     * // Get one CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategorieAchatFindUniqueArgs>(args: SelectSubset<T, CategorieAchatFindUniqueArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategorieAchat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategorieAchatFindUniqueOrThrowArgs} args - Arguments to find a CategorieAchat
     * @example
     * // Get one CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategorieAchatFindUniqueOrThrowArgs>(args: SelectSubset<T, CategorieAchatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategorieAchat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatFindFirstArgs} args - Arguments to find a CategorieAchat
     * @example
     * // Get one CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategorieAchatFindFirstArgs>(args?: SelectSubset<T, CategorieAchatFindFirstArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategorieAchat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatFindFirstOrThrowArgs} args - Arguments to find a CategorieAchat
     * @example
     * // Get one CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategorieAchatFindFirstOrThrowArgs>(args?: SelectSubset<T, CategorieAchatFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategorieAchats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategorieAchats
     * const categorieAchats = await prisma.categorieAchat.findMany()
     * 
     * // Get first 10 CategorieAchats
     * const categorieAchats = await prisma.categorieAchat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categorieAchatWithIdOnly = await prisma.categorieAchat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategorieAchatFindManyArgs>(args?: SelectSubset<T, CategorieAchatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategorieAchat.
     * @param {CategorieAchatCreateArgs} args - Arguments to create a CategorieAchat.
     * @example
     * // Create one CategorieAchat
     * const CategorieAchat = await prisma.categorieAchat.create({
     *   data: {
     *     // ... data to create a CategorieAchat
     *   }
     * })
     * 
     */
    create<T extends CategorieAchatCreateArgs>(args: SelectSubset<T, CategorieAchatCreateArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategorieAchats.
     * @param {CategorieAchatCreateManyArgs} args - Arguments to create many CategorieAchats.
     * @example
     * // Create many CategorieAchats
     * const categorieAchat = await prisma.categorieAchat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategorieAchatCreateManyArgs>(args?: SelectSubset<T, CategorieAchatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategorieAchats and returns the data saved in the database.
     * @param {CategorieAchatCreateManyAndReturnArgs} args - Arguments to create many CategorieAchats.
     * @example
     * // Create many CategorieAchats
     * const categorieAchat = await prisma.categorieAchat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategorieAchats and only return the `id`
     * const categorieAchatWithIdOnly = await prisma.categorieAchat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategorieAchatCreateManyAndReturnArgs>(args?: SelectSubset<T, CategorieAchatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CategorieAchat.
     * @param {CategorieAchatDeleteArgs} args - Arguments to delete one CategorieAchat.
     * @example
     * // Delete one CategorieAchat
     * const CategorieAchat = await prisma.categorieAchat.delete({
     *   where: {
     *     // ... filter to delete one CategorieAchat
     *   }
     * })
     * 
     */
    delete<T extends CategorieAchatDeleteArgs>(args: SelectSubset<T, CategorieAchatDeleteArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategorieAchat.
     * @param {CategorieAchatUpdateArgs} args - Arguments to update one CategorieAchat.
     * @example
     * // Update one CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategorieAchatUpdateArgs>(args: SelectSubset<T, CategorieAchatUpdateArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategorieAchats.
     * @param {CategorieAchatDeleteManyArgs} args - Arguments to filter CategorieAchats to delete.
     * @example
     * // Delete a few CategorieAchats
     * const { count } = await prisma.categorieAchat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategorieAchatDeleteManyArgs>(args?: SelectSubset<T, CategorieAchatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategorieAchats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategorieAchats
     * const categorieAchat = await prisma.categorieAchat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategorieAchatUpdateManyArgs>(args: SelectSubset<T, CategorieAchatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategorieAchats and returns the data updated in the database.
     * @param {CategorieAchatUpdateManyAndReturnArgs} args - Arguments to update many CategorieAchats.
     * @example
     * // Update many CategorieAchats
     * const categorieAchat = await prisma.categorieAchat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CategorieAchats and only return the `id`
     * const categorieAchatWithIdOnly = await prisma.categorieAchat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategorieAchatUpdateManyAndReturnArgs>(args: SelectSubset<T, CategorieAchatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CategorieAchat.
     * @param {CategorieAchatUpsertArgs} args - Arguments to update or create a CategorieAchat.
     * @example
     * // Update or create a CategorieAchat
     * const categorieAchat = await prisma.categorieAchat.upsert({
     *   create: {
     *     // ... data to create a CategorieAchat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategorieAchat we want to update
     *   }
     * })
     */
    upsert<T extends CategorieAchatUpsertArgs>(args: SelectSubset<T, CategorieAchatUpsertArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategorieAchats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatCountArgs} args - Arguments to filter CategorieAchats to count.
     * @example
     * // Count the number of CategorieAchats
     * const count = await prisma.categorieAchat.count({
     *   where: {
     *     // ... the filter for the CategorieAchats we want to count
     *   }
     * })
    **/
    count<T extends CategorieAchatCountArgs>(
      args?: Subset<T, CategorieAchatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategorieAchatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategorieAchat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategorieAchatAggregateArgs>(args: Subset<T, CategorieAchatAggregateArgs>): Prisma.PrismaPromise<GetCategorieAchatAggregateType<T>>

    /**
     * Group by CategorieAchat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAchatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategorieAchatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategorieAchatGroupByArgs['orderBy'] }
        : { orderBy?: CategorieAchatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategorieAchatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategorieAchatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategorieAchat model
   */
  readonly fields: CategorieAchatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategorieAchat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategorieAchatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bdc<T extends CategorieAchat$bdcArgs<ExtArgs> = {}>(args?: Subset<T, CategorieAchat$bdcArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategorieAchat model
   */
  interface CategorieAchatFieldRefs {
    readonly id: FieldRef<"CategorieAchat", 'String'>
    readonly code: FieldRef<"CategorieAchat", 'String'>
    readonly intitule: FieldRef<"CategorieAchat", 'String'>
    readonly pourcentageFg: FieldRef<"CategorieAchat", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * CategorieAchat findUnique
   */
  export type CategorieAchatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter, which CategorieAchat to fetch.
     */
    where: CategorieAchatWhereUniqueInput
  }

  /**
   * CategorieAchat findUniqueOrThrow
   */
  export type CategorieAchatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter, which CategorieAchat to fetch.
     */
    where: CategorieAchatWhereUniqueInput
  }

  /**
   * CategorieAchat findFirst
   */
  export type CategorieAchatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter, which CategorieAchat to fetch.
     */
    where?: CategorieAchatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategorieAchats to fetch.
     */
    orderBy?: CategorieAchatOrderByWithRelationInput | CategorieAchatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategorieAchats.
     */
    cursor?: CategorieAchatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategorieAchats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategorieAchats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategorieAchats.
     */
    distinct?: CategorieAchatScalarFieldEnum | CategorieAchatScalarFieldEnum[]
  }

  /**
   * CategorieAchat findFirstOrThrow
   */
  export type CategorieAchatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter, which CategorieAchat to fetch.
     */
    where?: CategorieAchatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategorieAchats to fetch.
     */
    orderBy?: CategorieAchatOrderByWithRelationInput | CategorieAchatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategorieAchats.
     */
    cursor?: CategorieAchatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategorieAchats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategorieAchats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategorieAchats.
     */
    distinct?: CategorieAchatScalarFieldEnum | CategorieAchatScalarFieldEnum[]
  }

  /**
   * CategorieAchat findMany
   */
  export type CategorieAchatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter, which CategorieAchats to fetch.
     */
    where?: CategorieAchatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategorieAchats to fetch.
     */
    orderBy?: CategorieAchatOrderByWithRelationInput | CategorieAchatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategorieAchats.
     */
    cursor?: CategorieAchatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategorieAchats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategorieAchats.
     */
    skip?: number
    distinct?: CategorieAchatScalarFieldEnum | CategorieAchatScalarFieldEnum[]
  }

  /**
   * CategorieAchat create
   */
  export type CategorieAchatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * The data needed to create a CategorieAchat.
     */
    data: XOR<CategorieAchatCreateInput, CategorieAchatUncheckedCreateInput>
  }

  /**
   * CategorieAchat createMany
   */
  export type CategorieAchatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategorieAchats.
     */
    data: CategorieAchatCreateManyInput | CategorieAchatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategorieAchat createManyAndReturn
   */
  export type CategorieAchatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * The data used to create many CategorieAchats.
     */
    data: CategorieAchatCreateManyInput | CategorieAchatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategorieAchat update
   */
  export type CategorieAchatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * The data needed to update a CategorieAchat.
     */
    data: XOR<CategorieAchatUpdateInput, CategorieAchatUncheckedUpdateInput>
    /**
     * Choose, which CategorieAchat to update.
     */
    where: CategorieAchatWhereUniqueInput
  }

  /**
   * CategorieAchat updateMany
   */
  export type CategorieAchatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategorieAchats.
     */
    data: XOR<CategorieAchatUpdateManyMutationInput, CategorieAchatUncheckedUpdateManyInput>
    /**
     * Filter which CategorieAchats to update
     */
    where?: CategorieAchatWhereInput
    /**
     * Limit how many CategorieAchats to update.
     */
    limit?: number
  }

  /**
   * CategorieAchat updateManyAndReturn
   */
  export type CategorieAchatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * The data used to update CategorieAchats.
     */
    data: XOR<CategorieAchatUpdateManyMutationInput, CategorieAchatUncheckedUpdateManyInput>
    /**
     * Filter which CategorieAchats to update
     */
    where?: CategorieAchatWhereInput
    /**
     * Limit how many CategorieAchats to update.
     */
    limit?: number
  }

  /**
   * CategorieAchat upsert
   */
  export type CategorieAchatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * The filter to search for the CategorieAchat to update in case it exists.
     */
    where: CategorieAchatWhereUniqueInput
    /**
     * In case the CategorieAchat found by the `where` argument doesn't exist, create a new CategorieAchat with this data.
     */
    create: XOR<CategorieAchatCreateInput, CategorieAchatUncheckedCreateInput>
    /**
     * In case the CategorieAchat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategorieAchatUpdateInput, CategorieAchatUncheckedUpdateInput>
  }

  /**
   * CategorieAchat delete
   */
  export type CategorieAchatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
    /**
     * Filter which CategorieAchat to delete.
     */
    where: CategorieAchatWhereUniqueInput
  }

  /**
   * CategorieAchat deleteMany
   */
  export type CategorieAchatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategorieAchats to delete
     */
    where?: CategorieAchatWhereInput
    /**
     * Limit how many CategorieAchats to delete.
     */
    limit?: number
  }

  /**
   * CategorieAchat.bdc
   */
  export type CategorieAchat$bdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    where?: BdcWhereInput
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    cursor?: BdcWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BdcScalarFieldEnum | BdcScalarFieldEnum[]
  }

  /**
   * CategorieAchat without action
   */
  export type CategorieAchatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieAchat
     */
    select?: CategorieAchatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategorieAchat
     */
    omit?: CategorieAchatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieAchatInclude<ExtArgs> | null
  }


  /**
   * Model Bdc
   */

  export type AggregateBdc = {
    _count: BdcCountAggregateOutputType | null
    _avg: BdcAvgAggregateOutputType | null
    _sum: BdcSumAggregateOutputType | null
    _min: BdcMinAggregateOutputType | null
    _max: BdcMaxAggregateOutputType | null
  }

  export type BdcAvgAggregateOutputType = {
    montantHt: number | null
    montantFg: number | null
  }

  export type BdcSumAggregateOutputType = {
    montantHt: number | null
    montantFg: number | null
  }

  export type BdcMinAggregateOutputType = {
    id: string | null
    numero: string | null
    montantHt: number | null
    dateBdc: Date | null
    dateReception: Date | null
    commentaire: string | null
    affaireId: string | null
    categorieId: string | null
    fournisseur: string | null
    montantFg: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BdcMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    montantHt: number | null
    dateBdc: Date | null
    dateReception: Date | null
    commentaire: string | null
    affaireId: string | null
    categorieId: string | null
    fournisseur: string | null
    montantFg: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BdcCountAggregateOutputType = {
    id: number
    numero: number
    montantHt: number
    dateBdc: number
    dateReception: number
    commentaire: number
    affaireId: number
    categorieId: number
    fournisseur: number
    montantFg: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BdcAvgAggregateInputType = {
    montantHt?: true
    montantFg?: true
  }

  export type BdcSumAggregateInputType = {
    montantHt?: true
    montantFg?: true
  }

  export type BdcMinAggregateInputType = {
    id?: true
    numero?: true
    montantHt?: true
    dateBdc?: true
    dateReception?: true
    commentaire?: true
    affaireId?: true
    categorieId?: true
    fournisseur?: true
    montantFg?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BdcMaxAggregateInputType = {
    id?: true
    numero?: true
    montantHt?: true
    dateBdc?: true
    dateReception?: true
    commentaire?: true
    affaireId?: true
    categorieId?: true
    fournisseur?: true
    montantFg?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BdcCountAggregateInputType = {
    id?: true
    numero?: true
    montantHt?: true
    dateBdc?: true
    dateReception?: true
    commentaire?: true
    affaireId?: true
    categorieId?: true
    fournisseur?: true
    montantFg?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BdcAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bdc to aggregate.
     */
    where?: BdcWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bdcs to fetch.
     */
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BdcWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bdcs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bdcs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bdcs
    **/
    _count?: true | BdcCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BdcAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BdcSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BdcMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BdcMaxAggregateInputType
  }

  export type GetBdcAggregateType<T extends BdcAggregateArgs> = {
        [P in keyof T & keyof AggregateBdc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBdc[P]>
      : GetScalarType<T[P], AggregateBdc[P]>
  }




  export type BdcGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BdcWhereInput
    orderBy?: BdcOrderByWithAggregationInput | BdcOrderByWithAggregationInput[]
    by: BdcScalarFieldEnum[] | BdcScalarFieldEnum
    having?: BdcScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BdcCountAggregateInputType | true
    _avg?: BdcAvgAggregateInputType
    _sum?: BdcSumAggregateInputType
    _min?: BdcMinAggregateInputType
    _max?: BdcMaxAggregateInputType
  }

  export type BdcGroupByOutputType = {
    id: string
    numero: string
    montantHt: number
    dateBdc: Date
    dateReception: Date | null
    commentaire: string | null
    affaireId: string
    categorieId: string
    fournisseur: string
    montantFg: number
    createdAt: Date
    updatedAt: Date
    _count: BdcCountAggregateOutputType | null
    _avg: BdcAvgAggregateOutputType | null
    _sum: BdcSumAggregateOutputType | null
    _min: BdcMinAggregateOutputType | null
    _max: BdcMaxAggregateOutputType | null
  }

  type GetBdcGroupByPayload<T extends BdcGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BdcGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BdcGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BdcGroupByOutputType[P]>
            : GetScalarType<T[P], BdcGroupByOutputType[P]>
        }
      >
    >


  export type BdcSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    montantHt?: boolean
    dateBdc?: boolean
    dateReception?: boolean
    commentaire?: boolean
    affaireId?: boolean
    categorieId?: boolean
    fournisseur?: boolean
    montantFg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    montantHt?: boolean
    dateBdc?: boolean
    dateReception?: boolean
    commentaire?: boolean
    affaireId?: boolean
    categorieId?: boolean
    fournisseur?: boolean
    montantFg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    montantHt?: boolean
    dateBdc?: boolean
    dateReception?: boolean
    commentaire?: boolean
    affaireId?: boolean
    categorieId?: boolean
    fournisseur?: boolean
    montantFg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectScalar = {
    id?: boolean
    numero?: boolean
    montantHt?: boolean
    dateBdc?: boolean
    dateReception?: boolean
    commentaire?: boolean
    affaireId?: boolean
    categorieId?: boolean
    fournisseur?: boolean
    montantFg?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BdcOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "montantHt" | "dateBdc" | "dateReception" | "commentaire" | "affaireId" | "categorieId" | "fournisseur" | "montantFg" | "createdAt" | "updatedAt", ExtArgs["result"]["bdc"]>
  export type BdcInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }
  export type BdcIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }
  export type BdcIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    categorie?: boolean | CategorieAchatDefaultArgs<ExtArgs>
  }

  export type $BdcPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bdc"
    objects: {
      affaire: Prisma.$AffairePayload<ExtArgs>
      categorie: Prisma.$CategorieAchatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      montantHt: number
      dateBdc: Date
      dateReception: Date | null
      commentaire: string | null
      affaireId: string
      categorieId: string
      fournisseur: string
      montantFg: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bdc"]>
    composites: {}
  }

  type BdcGetPayload<S extends boolean | null | undefined | BdcDefaultArgs> = $Result.GetResult<Prisma.$BdcPayload, S>

  type BdcCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BdcFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BdcCountAggregateInputType | true
    }

  export interface BdcDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bdc'], meta: { name: 'Bdc' } }
    /**
     * Find zero or one Bdc that matches the filter.
     * @param {BdcFindUniqueArgs} args - Arguments to find a Bdc
     * @example
     * // Get one Bdc
     * const bdc = await prisma.bdc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BdcFindUniqueArgs>(args: SelectSubset<T, BdcFindUniqueArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bdc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BdcFindUniqueOrThrowArgs} args - Arguments to find a Bdc
     * @example
     * // Get one Bdc
     * const bdc = await prisma.bdc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BdcFindUniqueOrThrowArgs>(args: SelectSubset<T, BdcFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bdc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcFindFirstArgs} args - Arguments to find a Bdc
     * @example
     * // Get one Bdc
     * const bdc = await prisma.bdc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BdcFindFirstArgs>(args?: SelectSubset<T, BdcFindFirstArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bdc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcFindFirstOrThrowArgs} args - Arguments to find a Bdc
     * @example
     * // Get one Bdc
     * const bdc = await prisma.bdc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BdcFindFirstOrThrowArgs>(args?: SelectSubset<T, BdcFindFirstOrThrowArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bdcs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bdcs
     * const bdcs = await prisma.bdc.findMany()
     * 
     * // Get first 10 Bdcs
     * const bdcs = await prisma.bdc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bdcWithIdOnly = await prisma.bdc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BdcFindManyArgs>(args?: SelectSubset<T, BdcFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bdc.
     * @param {BdcCreateArgs} args - Arguments to create a Bdc.
     * @example
     * // Create one Bdc
     * const Bdc = await prisma.bdc.create({
     *   data: {
     *     // ... data to create a Bdc
     *   }
     * })
     * 
     */
    create<T extends BdcCreateArgs>(args: SelectSubset<T, BdcCreateArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bdcs.
     * @param {BdcCreateManyArgs} args - Arguments to create many Bdcs.
     * @example
     * // Create many Bdcs
     * const bdc = await prisma.bdc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BdcCreateManyArgs>(args?: SelectSubset<T, BdcCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bdcs and returns the data saved in the database.
     * @param {BdcCreateManyAndReturnArgs} args - Arguments to create many Bdcs.
     * @example
     * // Create many Bdcs
     * const bdc = await prisma.bdc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bdcs and only return the `id`
     * const bdcWithIdOnly = await prisma.bdc.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BdcCreateManyAndReturnArgs>(args?: SelectSubset<T, BdcCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bdc.
     * @param {BdcDeleteArgs} args - Arguments to delete one Bdc.
     * @example
     * // Delete one Bdc
     * const Bdc = await prisma.bdc.delete({
     *   where: {
     *     // ... filter to delete one Bdc
     *   }
     * })
     * 
     */
    delete<T extends BdcDeleteArgs>(args: SelectSubset<T, BdcDeleteArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bdc.
     * @param {BdcUpdateArgs} args - Arguments to update one Bdc.
     * @example
     * // Update one Bdc
     * const bdc = await prisma.bdc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BdcUpdateArgs>(args: SelectSubset<T, BdcUpdateArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bdcs.
     * @param {BdcDeleteManyArgs} args - Arguments to filter Bdcs to delete.
     * @example
     * // Delete a few Bdcs
     * const { count } = await prisma.bdc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BdcDeleteManyArgs>(args?: SelectSubset<T, BdcDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bdcs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bdcs
     * const bdc = await prisma.bdc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BdcUpdateManyArgs>(args: SelectSubset<T, BdcUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bdcs and returns the data updated in the database.
     * @param {BdcUpdateManyAndReturnArgs} args - Arguments to update many Bdcs.
     * @example
     * // Update many Bdcs
     * const bdc = await prisma.bdc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bdcs and only return the `id`
     * const bdcWithIdOnly = await prisma.bdc.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BdcUpdateManyAndReturnArgs>(args: SelectSubset<T, BdcUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bdc.
     * @param {BdcUpsertArgs} args - Arguments to update or create a Bdc.
     * @example
     * // Update or create a Bdc
     * const bdc = await prisma.bdc.upsert({
     *   create: {
     *     // ... data to create a Bdc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bdc we want to update
     *   }
     * })
     */
    upsert<T extends BdcUpsertArgs>(args: SelectSubset<T, BdcUpsertArgs<ExtArgs>>): Prisma__BdcClient<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bdcs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcCountArgs} args - Arguments to filter Bdcs to count.
     * @example
     * // Count the number of Bdcs
     * const count = await prisma.bdc.count({
     *   where: {
     *     // ... the filter for the Bdcs we want to count
     *   }
     * })
    **/
    count<T extends BdcCountArgs>(
      args?: Subset<T, BdcCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BdcCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bdc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BdcAggregateArgs>(args: Subset<T, BdcAggregateArgs>): Prisma.PrismaPromise<GetBdcAggregateType<T>>

    /**
     * Group by Bdc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BdcGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BdcGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BdcGroupByArgs['orderBy'] }
        : { orderBy?: BdcGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BdcGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBdcGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bdc model
   */
  readonly fields: BdcFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bdc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BdcClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affaire<T extends AffaireDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffaireDefaultArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categorie<T extends CategorieAchatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategorieAchatDefaultArgs<ExtArgs>>): Prisma__CategorieAchatClient<$Result.GetResult<Prisma.$CategorieAchatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bdc model
   */
  interface BdcFieldRefs {
    readonly id: FieldRef<"Bdc", 'String'>
    readonly numero: FieldRef<"Bdc", 'String'>
    readonly montantHt: FieldRef<"Bdc", 'Float'>
    readonly dateBdc: FieldRef<"Bdc", 'DateTime'>
    readonly dateReception: FieldRef<"Bdc", 'DateTime'>
    readonly commentaire: FieldRef<"Bdc", 'String'>
    readonly affaireId: FieldRef<"Bdc", 'String'>
    readonly categorieId: FieldRef<"Bdc", 'String'>
    readonly fournisseur: FieldRef<"Bdc", 'String'>
    readonly montantFg: FieldRef<"Bdc", 'Float'>
    readonly createdAt: FieldRef<"Bdc", 'DateTime'>
    readonly updatedAt: FieldRef<"Bdc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bdc findUnique
   */
  export type BdcFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter, which Bdc to fetch.
     */
    where: BdcWhereUniqueInput
  }

  /**
   * Bdc findUniqueOrThrow
   */
  export type BdcFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter, which Bdc to fetch.
     */
    where: BdcWhereUniqueInput
  }

  /**
   * Bdc findFirst
   */
  export type BdcFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter, which Bdc to fetch.
     */
    where?: BdcWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bdcs to fetch.
     */
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bdcs.
     */
    cursor?: BdcWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bdcs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bdcs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bdcs.
     */
    distinct?: BdcScalarFieldEnum | BdcScalarFieldEnum[]
  }

  /**
   * Bdc findFirstOrThrow
   */
  export type BdcFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter, which Bdc to fetch.
     */
    where?: BdcWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bdcs to fetch.
     */
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bdcs.
     */
    cursor?: BdcWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bdcs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bdcs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bdcs.
     */
    distinct?: BdcScalarFieldEnum | BdcScalarFieldEnum[]
  }

  /**
   * Bdc findMany
   */
  export type BdcFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter, which Bdcs to fetch.
     */
    where?: BdcWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bdcs to fetch.
     */
    orderBy?: BdcOrderByWithRelationInput | BdcOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bdcs.
     */
    cursor?: BdcWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bdcs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bdcs.
     */
    skip?: number
    distinct?: BdcScalarFieldEnum | BdcScalarFieldEnum[]
  }

  /**
   * Bdc create
   */
  export type BdcCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * The data needed to create a Bdc.
     */
    data: XOR<BdcCreateInput, BdcUncheckedCreateInput>
  }

  /**
   * Bdc createMany
   */
  export type BdcCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bdcs.
     */
    data: BdcCreateManyInput | BdcCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bdc createManyAndReturn
   */
  export type BdcCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * The data used to create many Bdcs.
     */
    data: BdcCreateManyInput | BdcCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bdc update
   */
  export type BdcUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * The data needed to update a Bdc.
     */
    data: XOR<BdcUpdateInput, BdcUncheckedUpdateInput>
    /**
     * Choose, which Bdc to update.
     */
    where: BdcWhereUniqueInput
  }

  /**
   * Bdc updateMany
   */
  export type BdcUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bdcs.
     */
    data: XOR<BdcUpdateManyMutationInput, BdcUncheckedUpdateManyInput>
    /**
     * Filter which Bdcs to update
     */
    where?: BdcWhereInput
    /**
     * Limit how many Bdcs to update.
     */
    limit?: number
  }

  /**
   * Bdc updateManyAndReturn
   */
  export type BdcUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * The data used to update Bdcs.
     */
    data: XOR<BdcUpdateManyMutationInput, BdcUncheckedUpdateManyInput>
    /**
     * Filter which Bdcs to update
     */
    where?: BdcWhereInput
    /**
     * Limit how many Bdcs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bdc upsert
   */
  export type BdcUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * The filter to search for the Bdc to update in case it exists.
     */
    where: BdcWhereUniqueInput
    /**
     * In case the Bdc found by the `where` argument doesn't exist, create a new Bdc with this data.
     */
    create: XOR<BdcCreateInput, BdcUncheckedCreateInput>
    /**
     * In case the Bdc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BdcUpdateInput, BdcUncheckedUpdateInput>
  }

  /**
   * Bdc delete
   */
  export type BdcDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
    /**
     * Filter which Bdc to delete.
     */
    where: BdcWhereUniqueInput
  }

  /**
   * Bdc deleteMany
   */
  export type BdcDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bdcs to delete
     */
    where?: BdcWhereInput
    /**
     * Limit how many Bdcs to delete.
     */
    limit?: number
  }

  /**
   * Bdc without action
   */
  export type BdcDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bdc
     */
    select?: BdcSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bdc
     */
    omit?: BdcOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BdcInclude<ExtArgs> | null
  }


  /**
   * Model Pointage
   */

  export type AggregatePointage = {
    _count: PointageCountAggregateOutputType | null
    _avg: PointageAvgAggregateOutputType | null
    _sum: PointageSumAggregateOutputType | null
    _min: PointageMinAggregateOutputType | null
    _max: PointageMaxAggregateOutputType | null
  }

  export type PointageAvgAggregateOutputType = {
    nbHeures: number | null
  }

  export type PointageSumAggregateOutputType = {
    nbHeures: number | null
  }

  export type PointageMinAggregateOutputType = {
    id: string | null
    datePointage: Date | null
    nbHeures: number | null
    commentaire: string | null
    typeHeure: $Enums.TypeHeure | null
    affaireId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointageMaxAggregateOutputType = {
    id: string | null
    datePointage: Date | null
    nbHeures: number | null
    commentaire: string | null
    typeHeure: $Enums.TypeHeure | null
    affaireId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointageCountAggregateOutputType = {
    id: number
    datePointage: number
    nbHeures: number
    commentaire: number
    typeHeure: number
    affaireId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PointageAvgAggregateInputType = {
    nbHeures?: true
  }

  export type PointageSumAggregateInputType = {
    nbHeures?: true
  }

  export type PointageMinAggregateInputType = {
    id?: true
    datePointage?: true
    nbHeures?: true
    commentaire?: true
    typeHeure?: true
    affaireId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointageMaxAggregateInputType = {
    id?: true
    datePointage?: true
    nbHeures?: true
    commentaire?: true
    typeHeure?: true
    affaireId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointageCountAggregateInputType = {
    id?: true
    datePointage?: true
    nbHeures?: true
    commentaire?: true
    typeHeure?: true
    affaireId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PointageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pointage to aggregate.
     */
    where?: PointageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pointages to fetch.
     */
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pointages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pointages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pointages
    **/
    _count?: true | PointageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointageMaxAggregateInputType
  }

  export type GetPointageAggregateType<T extends PointageAggregateArgs> = {
        [P in keyof T & keyof AggregatePointage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointage[P]>
      : GetScalarType<T[P], AggregatePointage[P]>
  }




  export type PointageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointageWhereInput
    orderBy?: PointageOrderByWithAggregationInput | PointageOrderByWithAggregationInput[]
    by: PointageScalarFieldEnum[] | PointageScalarFieldEnum
    having?: PointageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointageCountAggregateInputType | true
    _avg?: PointageAvgAggregateInputType
    _sum?: PointageSumAggregateInputType
    _min?: PointageMinAggregateInputType
    _max?: PointageMaxAggregateInputType
  }

  export type PointageGroupByOutputType = {
    id: string
    datePointage: Date
    nbHeures: number
    commentaire: string | null
    typeHeure: $Enums.TypeHeure
    affaireId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: PointageCountAggregateOutputType | null
    _avg: PointageAvgAggregateOutputType | null
    _sum: PointageSumAggregateOutputType | null
    _min: PointageMinAggregateOutputType | null
    _max: PointageMaxAggregateOutputType | null
  }

  type GetPointageGroupByPayload<T extends PointageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointageGroupByOutputType[P]>
            : GetScalarType<T[P], PointageGroupByOutputType[P]>
        }
      >
    >


  export type PointageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datePointage?: boolean
    nbHeures?: boolean
    commentaire?: boolean
    typeHeure?: boolean
    affaireId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datePointage?: boolean
    nbHeures?: boolean
    commentaire?: boolean
    typeHeure?: boolean
    affaireId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datePointage?: boolean
    nbHeures?: boolean
    commentaire?: boolean
    typeHeure?: boolean
    affaireId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectScalar = {
    id?: boolean
    datePointage?: boolean
    nbHeures?: boolean
    commentaire?: boolean
    typeHeure?: boolean
    affaireId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PointageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "datePointage" | "nbHeures" | "commentaire" | "typeHeure" | "affaireId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["pointage"]>
  export type PointageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PointageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PointageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PointagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pointage"
    objects: {
      affaire: Prisma.$AffairePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      datePointage: Date
      nbHeures: number
      commentaire: string | null
      typeHeure: $Enums.TypeHeure
      affaireId: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pointage"]>
    composites: {}
  }

  type PointageGetPayload<S extends boolean | null | undefined | PointageDefaultArgs> = $Result.GetResult<Prisma.$PointagePayload, S>

  type PointageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PointageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PointageCountAggregateInputType | true
    }

  export interface PointageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pointage'], meta: { name: 'Pointage' } }
    /**
     * Find zero or one Pointage that matches the filter.
     * @param {PointageFindUniqueArgs} args - Arguments to find a Pointage
     * @example
     * // Get one Pointage
     * const pointage = await prisma.pointage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointageFindUniqueArgs>(args: SelectSubset<T, PointageFindUniqueArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pointage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PointageFindUniqueOrThrowArgs} args - Arguments to find a Pointage
     * @example
     * // Get one Pointage
     * const pointage = await prisma.pointage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointageFindUniqueOrThrowArgs>(args: SelectSubset<T, PointageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pointage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageFindFirstArgs} args - Arguments to find a Pointage
     * @example
     * // Get one Pointage
     * const pointage = await prisma.pointage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointageFindFirstArgs>(args?: SelectSubset<T, PointageFindFirstArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pointage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageFindFirstOrThrowArgs} args - Arguments to find a Pointage
     * @example
     * // Get one Pointage
     * const pointage = await prisma.pointage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointageFindFirstOrThrowArgs>(args?: SelectSubset<T, PointageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pointages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pointages
     * const pointages = await prisma.pointage.findMany()
     * 
     * // Get first 10 Pointages
     * const pointages = await prisma.pointage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointageWithIdOnly = await prisma.pointage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointageFindManyArgs>(args?: SelectSubset<T, PointageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pointage.
     * @param {PointageCreateArgs} args - Arguments to create a Pointage.
     * @example
     * // Create one Pointage
     * const Pointage = await prisma.pointage.create({
     *   data: {
     *     // ... data to create a Pointage
     *   }
     * })
     * 
     */
    create<T extends PointageCreateArgs>(args: SelectSubset<T, PointageCreateArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pointages.
     * @param {PointageCreateManyArgs} args - Arguments to create many Pointages.
     * @example
     * // Create many Pointages
     * const pointage = await prisma.pointage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointageCreateManyArgs>(args?: SelectSubset<T, PointageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pointages and returns the data saved in the database.
     * @param {PointageCreateManyAndReturnArgs} args - Arguments to create many Pointages.
     * @example
     * // Create many Pointages
     * const pointage = await prisma.pointage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pointages and only return the `id`
     * const pointageWithIdOnly = await prisma.pointage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointageCreateManyAndReturnArgs>(args?: SelectSubset<T, PointageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pointage.
     * @param {PointageDeleteArgs} args - Arguments to delete one Pointage.
     * @example
     * // Delete one Pointage
     * const Pointage = await prisma.pointage.delete({
     *   where: {
     *     // ... filter to delete one Pointage
     *   }
     * })
     * 
     */
    delete<T extends PointageDeleteArgs>(args: SelectSubset<T, PointageDeleteArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pointage.
     * @param {PointageUpdateArgs} args - Arguments to update one Pointage.
     * @example
     * // Update one Pointage
     * const pointage = await prisma.pointage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointageUpdateArgs>(args: SelectSubset<T, PointageUpdateArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pointages.
     * @param {PointageDeleteManyArgs} args - Arguments to filter Pointages to delete.
     * @example
     * // Delete a few Pointages
     * const { count } = await prisma.pointage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointageDeleteManyArgs>(args?: SelectSubset<T, PointageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pointages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pointages
     * const pointage = await prisma.pointage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointageUpdateManyArgs>(args: SelectSubset<T, PointageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pointages and returns the data updated in the database.
     * @param {PointageUpdateManyAndReturnArgs} args - Arguments to update many Pointages.
     * @example
     * // Update many Pointages
     * const pointage = await prisma.pointage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pointages and only return the `id`
     * const pointageWithIdOnly = await prisma.pointage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PointageUpdateManyAndReturnArgs>(args: SelectSubset<T, PointageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pointage.
     * @param {PointageUpsertArgs} args - Arguments to update or create a Pointage.
     * @example
     * // Update or create a Pointage
     * const pointage = await prisma.pointage.upsert({
     *   create: {
     *     // ... data to create a Pointage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pointage we want to update
     *   }
     * })
     */
    upsert<T extends PointageUpsertArgs>(args: SelectSubset<T, PointageUpsertArgs<ExtArgs>>): Prisma__PointageClient<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pointages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageCountArgs} args - Arguments to filter Pointages to count.
     * @example
     * // Count the number of Pointages
     * const count = await prisma.pointage.count({
     *   where: {
     *     // ... the filter for the Pointages we want to count
     *   }
     * })
    **/
    count<T extends PointageCountArgs>(
      args?: Subset<T, PointageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pointage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PointageAggregateArgs>(args: Subset<T, PointageAggregateArgs>): Prisma.PrismaPromise<GetPointageAggregateType<T>>

    /**
     * Group by Pointage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PointageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointageGroupByArgs['orderBy'] }
        : { orderBy?: PointageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PointageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pointage model
   */
  readonly fields: PointageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pointage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affaire<T extends AffaireDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffaireDefaultArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pointage model
   */
  interface PointageFieldRefs {
    readonly id: FieldRef<"Pointage", 'String'>
    readonly datePointage: FieldRef<"Pointage", 'DateTime'>
    readonly nbHeures: FieldRef<"Pointage", 'Float'>
    readonly commentaire: FieldRef<"Pointage", 'String'>
    readonly typeHeure: FieldRef<"Pointage", 'TypeHeure'>
    readonly affaireId: FieldRef<"Pointage", 'String'>
    readonly userId: FieldRef<"Pointage", 'String'>
    readonly createdAt: FieldRef<"Pointage", 'DateTime'>
    readonly updatedAt: FieldRef<"Pointage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pointage findUnique
   */
  export type PointageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter, which Pointage to fetch.
     */
    where: PointageWhereUniqueInput
  }

  /**
   * Pointage findUniqueOrThrow
   */
  export type PointageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter, which Pointage to fetch.
     */
    where: PointageWhereUniqueInput
  }

  /**
   * Pointage findFirst
   */
  export type PointageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter, which Pointage to fetch.
     */
    where?: PointageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pointages to fetch.
     */
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pointages.
     */
    cursor?: PointageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pointages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pointages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pointages.
     */
    distinct?: PointageScalarFieldEnum | PointageScalarFieldEnum[]
  }

  /**
   * Pointage findFirstOrThrow
   */
  export type PointageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter, which Pointage to fetch.
     */
    where?: PointageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pointages to fetch.
     */
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pointages.
     */
    cursor?: PointageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pointages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pointages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pointages.
     */
    distinct?: PointageScalarFieldEnum | PointageScalarFieldEnum[]
  }

  /**
   * Pointage findMany
   */
  export type PointageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter, which Pointages to fetch.
     */
    where?: PointageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pointages to fetch.
     */
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pointages.
     */
    cursor?: PointageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pointages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pointages.
     */
    skip?: number
    distinct?: PointageScalarFieldEnum | PointageScalarFieldEnum[]
  }

  /**
   * Pointage create
   */
  export type PointageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * The data needed to create a Pointage.
     */
    data: XOR<PointageCreateInput, PointageUncheckedCreateInput>
  }

  /**
   * Pointage createMany
   */
  export type PointageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pointages.
     */
    data: PointageCreateManyInput | PointageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pointage createManyAndReturn
   */
  export type PointageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * The data used to create many Pointages.
     */
    data: PointageCreateManyInput | PointageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pointage update
   */
  export type PointageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * The data needed to update a Pointage.
     */
    data: XOR<PointageUpdateInput, PointageUncheckedUpdateInput>
    /**
     * Choose, which Pointage to update.
     */
    where: PointageWhereUniqueInput
  }

  /**
   * Pointage updateMany
   */
  export type PointageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pointages.
     */
    data: XOR<PointageUpdateManyMutationInput, PointageUncheckedUpdateManyInput>
    /**
     * Filter which Pointages to update
     */
    where?: PointageWhereInput
    /**
     * Limit how many Pointages to update.
     */
    limit?: number
  }

  /**
   * Pointage updateManyAndReturn
   */
  export type PointageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * The data used to update Pointages.
     */
    data: XOR<PointageUpdateManyMutationInput, PointageUncheckedUpdateManyInput>
    /**
     * Filter which Pointages to update
     */
    where?: PointageWhereInput
    /**
     * Limit how many Pointages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pointage upsert
   */
  export type PointageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * The filter to search for the Pointage to update in case it exists.
     */
    where: PointageWhereUniqueInput
    /**
     * In case the Pointage found by the `where` argument doesn't exist, create a new Pointage with this data.
     */
    create: XOR<PointageCreateInput, PointageUncheckedCreateInput>
    /**
     * In case the Pointage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointageUpdateInput, PointageUncheckedUpdateInput>
  }

  /**
   * Pointage delete
   */
  export type PointageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    /**
     * Filter which Pointage to delete.
     */
    where: PointageWhereUniqueInput
  }

  /**
   * Pointage deleteMany
   */
  export type PointageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pointages to delete
     */
    where?: PointageWhereInput
    /**
     * Limit how many Pointages to delete.
     */
    limit?: number
  }

  /**
   * Pointage without action
   */
  export type PointageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
  }


  /**
   * Model ParametreGlobal
   */

  export type AggregateParametreGlobal = {
    _count: ParametreGlobalCountAggregateOutputType | null
    _min: ParametreGlobalMinAggregateOutputType | null
    _max: ParametreGlobalMaxAggregateOutputType | null
  }

  export type ParametreGlobalMinAggregateOutputType = {
    id: string | null
    cle: string | null
    valeur: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParametreGlobalMaxAggregateOutputType = {
    id: string | null
    cle: string | null
    valeur: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParametreGlobalCountAggregateOutputType = {
    id: number
    cle: number
    valeur: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParametreGlobalMinAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParametreGlobalMaxAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParametreGlobalCountAggregateInputType = {
    id?: true
    cle?: true
    valeur?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParametreGlobalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParametreGlobal to aggregate.
     */
    where?: ParametreGlobalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParametreGlobals to fetch.
     */
    orderBy?: ParametreGlobalOrderByWithRelationInput | ParametreGlobalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParametreGlobalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParametreGlobals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParametreGlobals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParametreGlobals
    **/
    _count?: true | ParametreGlobalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParametreGlobalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParametreGlobalMaxAggregateInputType
  }

  export type GetParametreGlobalAggregateType<T extends ParametreGlobalAggregateArgs> = {
        [P in keyof T & keyof AggregateParametreGlobal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParametreGlobal[P]>
      : GetScalarType<T[P], AggregateParametreGlobal[P]>
  }




  export type ParametreGlobalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParametreGlobalWhereInput
    orderBy?: ParametreGlobalOrderByWithAggregationInput | ParametreGlobalOrderByWithAggregationInput[]
    by: ParametreGlobalScalarFieldEnum[] | ParametreGlobalScalarFieldEnum
    having?: ParametreGlobalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParametreGlobalCountAggregateInputType | true
    _min?: ParametreGlobalMinAggregateInputType
    _max?: ParametreGlobalMaxAggregateInputType
  }

  export type ParametreGlobalGroupByOutputType = {
    id: string
    cle: string
    valeur: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ParametreGlobalCountAggregateOutputType | null
    _min: ParametreGlobalMinAggregateOutputType | null
    _max: ParametreGlobalMaxAggregateOutputType | null
  }

  type GetParametreGlobalGroupByPayload<T extends ParametreGlobalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParametreGlobalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParametreGlobalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParametreGlobalGroupByOutputType[P]>
            : GetScalarType<T[P], ParametreGlobalGroupByOutputType[P]>
        }
      >
    >


  export type ParametreGlobalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parametreGlobal"]>

  export type ParametreGlobalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parametreGlobal"]>

  export type ParametreGlobalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parametreGlobal"]>

  export type ParametreGlobalSelectScalar = {
    id?: boolean
    cle?: boolean
    valeur?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParametreGlobalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cle" | "valeur" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["parametreGlobal"]>

  export type $ParametreGlobalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParametreGlobal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cle: string
      valeur: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parametreGlobal"]>
    composites: {}
  }

  type ParametreGlobalGetPayload<S extends boolean | null | undefined | ParametreGlobalDefaultArgs> = $Result.GetResult<Prisma.$ParametreGlobalPayload, S>

  type ParametreGlobalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParametreGlobalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParametreGlobalCountAggregateInputType | true
    }

  export interface ParametreGlobalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParametreGlobal'], meta: { name: 'ParametreGlobal' } }
    /**
     * Find zero or one ParametreGlobal that matches the filter.
     * @param {ParametreGlobalFindUniqueArgs} args - Arguments to find a ParametreGlobal
     * @example
     * // Get one ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParametreGlobalFindUniqueArgs>(args: SelectSubset<T, ParametreGlobalFindUniqueArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParametreGlobal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParametreGlobalFindUniqueOrThrowArgs} args - Arguments to find a ParametreGlobal
     * @example
     * // Get one ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParametreGlobalFindUniqueOrThrowArgs>(args: SelectSubset<T, ParametreGlobalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParametreGlobal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalFindFirstArgs} args - Arguments to find a ParametreGlobal
     * @example
     * // Get one ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParametreGlobalFindFirstArgs>(args?: SelectSubset<T, ParametreGlobalFindFirstArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParametreGlobal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalFindFirstOrThrowArgs} args - Arguments to find a ParametreGlobal
     * @example
     * // Get one ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParametreGlobalFindFirstOrThrowArgs>(args?: SelectSubset<T, ParametreGlobalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParametreGlobals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParametreGlobals
     * const parametreGlobals = await prisma.parametreGlobal.findMany()
     * 
     * // Get first 10 ParametreGlobals
     * const parametreGlobals = await prisma.parametreGlobal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parametreGlobalWithIdOnly = await prisma.parametreGlobal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParametreGlobalFindManyArgs>(args?: SelectSubset<T, ParametreGlobalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParametreGlobal.
     * @param {ParametreGlobalCreateArgs} args - Arguments to create a ParametreGlobal.
     * @example
     * // Create one ParametreGlobal
     * const ParametreGlobal = await prisma.parametreGlobal.create({
     *   data: {
     *     // ... data to create a ParametreGlobal
     *   }
     * })
     * 
     */
    create<T extends ParametreGlobalCreateArgs>(args: SelectSubset<T, ParametreGlobalCreateArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParametreGlobals.
     * @param {ParametreGlobalCreateManyArgs} args - Arguments to create many ParametreGlobals.
     * @example
     * // Create many ParametreGlobals
     * const parametreGlobal = await prisma.parametreGlobal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParametreGlobalCreateManyArgs>(args?: SelectSubset<T, ParametreGlobalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParametreGlobals and returns the data saved in the database.
     * @param {ParametreGlobalCreateManyAndReturnArgs} args - Arguments to create many ParametreGlobals.
     * @example
     * // Create many ParametreGlobals
     * const parametreGlobal = await prisma.parametreGlobal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParametreGlobals and only return the `id`
     * const parametreGlobalWithIdOnly = await prisma.parametreGlobal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParametreGlobalCreateManyAndReturnArgs>(args?: SelectSubset<T, ParametreGlobalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParametreGlobal.
     * @param {ParametreGlobalDeleteArgs} args - Arguments to delete one ParametreGlobal.
     * @example
     * // Delete one ParametreGlobal
     * const ParametreGlobal = await prisma.parametreGlobal.delete({
     *   where: {
     *     // ... filter to delete one ParametreGlobal
     *   }
     * })
     * 
     */
    delete<T extends ParametreGlobalDeleteArgs>(args: SelectSubset<T, ParametreGlobalDeleteArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParametreGlobal.
     * @param {ParametreGlobalUpdateArgs} args - Arguments to update one ParametreGlobal.
     * @example
     * // Update one ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParametreGlobalUpdateArgs>(args: SelectSubset<T, ParametreGlobalUpdateArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParametreGlobals.
     * @param {ParametreGlobalDeleteManyArgs} args - Arguments to filter ParametreGlobals to delete.
     * @example
     * // Delete a few ParametreGlobals
     * const { count } = await prisma.parametreGlobal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParametreGlobalDeleteManyArgs>(args?: SelectSubset<T, ParametreGlobalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParametreGlobals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParametreGlobals
     * const parametreGlobal = await prisma.parametreGlobal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParametreGlobalUpdateManyArgs>(args: SelectSubset<T, ParametreGlobalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParametreGlobals and returns the data updated in the database.
     * @param {ParametreGlobalUpdateManyAndReturnArgs} args - Arguments to update many ParametreGlobals.
     * @example
     * // Update many ParametreGlobals
     * const parametreGlobal = await prisma.parametreGlobal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParametreGlobals and only return the `id`
     * const parametreGlobalWithIdOnly = await prisma.parametreGlobal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParametreGlobalUpdateManyAndReturnArgs>(args: SelectSubset<T, ParametreGlobalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParametreGlobal.
     * @param {ParametreGlobalUpsertArgs} args - Arguments to update or create a ParametreGlobal.
     * @example
     * // Update or create a ParametreGlobal
     * const parametreGlobal = await prisma.parametreGlobal.upsert({
     *   create: {
     *     // ... data to create a ParametreGlobal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParametreGlobal we want to update
     *   }
     * })
     */
    upsert<T extends ParametreGlobalUpsertArgs>(args: SelectSubset<T, ParametreGlobalUpsertArgs<ExtArgs>>): Prisma__ParametreGlobalClient<$Result.GetResult<Prisma.$ParametreGlobalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParametreGlobals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalCountArgs} args - Arguments to filter ParametreGlobals to count.
     * @example
     * // Count the number of ParametreGlobals
     * const count = await prisma.parametreGlobal.count({
     *   where: {
     *     // ... the filter for the ParametreGlobals we want to count
     *   }
     * })
    **/
    count<T extends ParametreGlobalCountArgs>(
      args?: Subset<T, ParametreGlobalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParametreGlobalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParametreGlobal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParametreGlobalAggregateArgs>(args: Subset<T, ParametreGlobalAggregateArgs>): Prisma.PrismaPromise<GetParametreGlobalAggregateType<T>>

    /**
     * Group by ParametreGlobal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametreGlobalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParametreGlobalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParametreGlobalGroupByArgs['orderBy'] }
        : { orderBy?: ParametreGlobalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParametreGlobalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParametreGlobalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParametreGlobal model
   */
  readonly fields: ParametreGlobalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParametreGlobal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParametreGlobalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParametreGlobal model
   */
  interface ParametreGlobalFieldRefs {
    readonly id: FieldRef<"ParametreGlobal", 'String'>
    readonly cle: FieldRef<"ParametreGlobal", 'String'>
    readonly valeur: FieldRef<"ParametreGlobal", 'String'>
    readonly description: FieldRef<"ParametreGlobal", 'String'>
    readonly createdAt: FieldRef<"ParametreGlobal", 'DateTime'>
    readonly updatedAt: FieldRef<"ParametreGlobal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParametreGlobal findUnique
   */
  export type ParametreGlobalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter, which ParametreGlobal to fetch.
     */
    where: ParametreGlobalWhereUniqueInput
  }

  /**
   * ParametreGlobal findUniqueOrThrow
   */
  export type ParametreGlobalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter, which ParametreGlobal to fetch.
     */
    where: ParametreGlobalWhereUniqueInput
  }

  /**
   * ParametreGlobal findFirst
   */
  export type ParametreGlobalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter, which ParametreGlobal to fetch.
     */
    where?: ParametreGlobalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParametreGlobals to fetch.
     */
    orderBy?: ParametreGlobalOrderByWithRelationInput | ParametreGlobalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParametreGlobals.
     */
    cursor?: ParametreGlobalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParametreGlobals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParametreGlobals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParametreGlobals.
     */
    distinct?: ParametreGlobalScalarFieldEnum | ParametreGlobalScalarFieldEnum[]
  }

  /**
   * ParametreGlobal findFirstOrThrow
   */
  export type ParametreGlobalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter, which ParametreGlobal to fetch.
     */
    where?: ParametreGlobalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParametreGlobals to fetch.
     */
    orderBy?: ParametreGlobalOrderByWithRelationInput | ParametreGlobalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParametreGlobals.
     */
    cursor?: ParametreGlobalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParametreGlobals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParametreGlobals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParametreGlobals.
     */
    distinct?: ParametreGlobalScalarFieldEnum | ParametreGlobalScalarFieldEnum[]
  }

  /**
   * ParametreGlobal findMany
   */
  export type ParametreGlobalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter, which ParametreGlobals to fetch.
     */
    where?: ParametreGlobalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParametreGlobals to fetch.
     */
    orderBy?: ParametreGlobalOrderByWithRelationInput | ParametreGlobalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParametreGlobals.
     */
    cursor?: ParametreGlobalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParametreGlobals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParametreGlobals.
     */
    skip?: number
    distinct?: ParametreGlobalScalarFieldEnum | ParametreGlobalScalarFieldEnum[]
  }

  /**
   * ParametreGlobal create
   */
  export type ParametreGlobalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * The data needed to create a ParametreGlobal.
     */
    data: XOR<ParametreGlobalCreateInput, ParametreGlobalUncheckedCreateInput>
  }

  /**
   * ParametreGlobal createMany
   */
  export type ParametreGlobalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParametreGlobals.
     */
    data: ParametreGlobalCreateManyInput | ParametreGlobalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParametreGlobal createManyAndReturn
   */
  export type ParametreGlobalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * The data used to create many ParametreGlobals.
     */
    data: ParametreGlobalCreateManyInput | ParametreGlobalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParametreGlobal update
   */
  export type ParametreGlobalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * The data needed to update a ParametreGlobal.
     */
    data: XOR<ParametreGlobalUpdateInput, ParametreGlobalUncheckedUpdateInput>
    /**
     * Choose, which ParametreGlobal to update.
     */
    where: ParametreGlobalWhereUniqueInput
  }

  /**
   * ParametreGlobal updateMany
   */
  export type ParametreGlobalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParametreGlobals.
     */
    data: XOR<ParametreGlobalUpdateManyMutationInput, ParametreGlobalUncheckedUpdateManyInput>
    /**
     * Filter which ParametreGlobals to update
     */
    where?: ParametreGlobalWhereInput
    /**
     * Limit how many ParametreGlobals to update.
     */
    limit?: number
  }

  /**
   * ParametreGlobal updateManyAndReturn
   */
  export type ParametreGlobalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * The data used to update ParametreGlobals.
     */
    data: XOR<ParametreGlobalUpdateManyMutationInput, ParametreGlobalUncheckedUpdateManyInput>
    /**
     * Filter which ParametreGlobals to update
     */
    where?: ParametreGlobalWhereInput
    /**
     * Limit how many ParametreGlobals to update.
     */
    limit?: number
  }

  /**
   * ParametreGlobal upsert
   */
  export type ParametreGlobalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * The filter to search for the ParametreGlobal to update in case it exists.
     */
    where: ParametreGlobalWhereUniqueInput
    /**
     * In case the ParametreGlobal found by the `where` argument doesn't exist, create a new ParametreGlobal with this data.
     */
    create: XOR<ParametreGlobalCreateInput, ParametreGlobalUncheckedCreateInput>
    /**
     * In case the ParametreGlobal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParametreGlobalUpdateInput, ParametreGlobalUncheckedUpdateInput>
  }

  /**
   * ParametreGlobal delete
   */
  export type ParametreGlobalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
    /**
     * Filter which ParametreGlobal to delete.
     */
    where: ParametreGlobalWhereUniqueInput
  }

  /**
   * ParametreGlobal deleteMany
   */
  export type ParametreGlobalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParametreGlobals to delete
     */
    where?: ParametreGlobalWhereInput
    /**
     * Limit how many ParametreGlobals to delete.
     */
    limit?: number
  }

  /**
   * ParametreGlobal without action
   */
  export type ParametreGlobalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParametreGlobal
     */
    select?: ParametreGlobalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParametreGlobal
     */
    omit?: ParametreGlobalOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    nom: string | null
    prenom: string | null
    passwordHash: string | null
    role: $Enums.RoleEnum | null
    actif: boolean | null
    supprime: boolean | null
    supprimeLe: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    nom: string | null
    prenom: string | null
    passwordHash: string | null
    role: $Enums.RoleEnum | null
    actif: boolean | null
    supprime: boolean | null
    supprimeLe: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    nom: number
    prenom: number
    passwordHash: number
    role: number
    actif: number
    supprime: number
    supprimeLe: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    passwordHash?: true
    role?: true
    actif?: true
    supprime?: true
    supprimeLe?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    passwordHash?: true
    role?: true
    actif?: true
    supprime?: true
    supprimeLe?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    passwordHash?: true
    role?: true
    actif?: true
    supprime?: true
    supprimeLe?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif: boolean
    supprime: boolean
    supprimeLe: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    passwordHash?: boolean
    role?: boolean
    actif?: boolean
    supprime?: boolean
    supprimeLe?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pointages?: boolean | User$pointagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    passwordHash?: boolean
    role?: boolean
    actif?: boolean
    supprime?: boolean
    supprimeLe?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    passwordHash?: boolean
    role?: boolean
    actif?: boolean
    supprime?: boolean
    supprimeLe?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    passwordHash?: boolean
    role?: boolean
    actif?: boolean
    supprime?: boolean
    supprimeLe?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "nom" | "prenom" | "passwordHash" | "role" | "actif" | "supprime" | "supprimeLe" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointages?: boolean | User$pointagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      pointages: Prisma.$PointagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      nom: string
      prenom: string
      passwordHash: string
      role: $Enums.RoleEnum
      actif: boolean
      supprime: boolean
      supprimeLe: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pointages<T extends User$pointagesArgs<ExtArgs> = {}>(args?: Subset<T, User$pointagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'RoleEnum'>
    readonly actif: FieldRef<"User", 'Boolean'>
    readonly supprime: FieldRef<"User", 'Boolean'>
    readonly supprimeLe: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.pointages
   */
  export type User$pointagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pointage
     */
    select?: PointageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pointage
     */
    omit?: PointageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointageInclude<ExtArgs> | null
    where?: PointageWhereInput
    orderBy?: PointageOrderByWithRelationInput | PointageOrderByWithRelationInput[]
    cursor?: PointageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointageScalarFieldEnum | PointageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AffaireScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    libelle: 'libelle',
    client: 'client',
    adresse: 'adresse',
    dateCreation: 'dateCreation',
    dateCloturePrevue: 'dateCloturePrevue',
    objectifCaHt: 'objectifCaHt',
    objectifAchatHt: 'objectifAchatHt',
    objectifHeuresFab: 'objectifHeuresFab',
    ser: 'ser',
    pose: 'pose',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffaireScalarFieldEnum = (typeof AffaireScalarFieldEnum)[keyof typeof AffaireScalarFieldEnum]


  export const CategorieAchatScalarFieldEnum: {
    id: 'id',
    code: 'code',
    intitule: 'intitule',
    pourcentageFg: 'pourcentageFg'
  };

  export type CategorieAchatScalarFieldEnum = (typeof CategorieAchatScalarFieldEnum)[keyof typeof CategorieAchatScalarFieldEnum]


  export const BdcScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    montantHt: 'montantHt',
    dateBdc: 'dateBdc',
    dateReception: 'dateReception',
    commentaire: 'commentaire',
    affaireId: 'affaireId',
    categorieId: 'categorieId',
    fournisseur: 'fournisseur',
    montantFg: 'montantFg',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BdcScalarFieldEnum = (typeof BdcScalarFieldEnum)[keyof typeof BdcScalarFieldEnum]


  export const PointageScalarFieldEnum: {
    id: 'id',
    datePointage: 'datePointage',
    nbHeures: 'nbHeures',
    commentaire: 'commentaire',
    typeHeure: 'typeHeure',
    affaireId: 'affaireId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PointageScalarFieldEnum = (typeof PointageScalarFieldEnum)[keyof typeof PointageScalarFieldEnum]


  export const ParametreGlobalScalarFieldEnum: {
    id: 'id',
    cle: 'cle',
    valeur: 'valeur',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParametreGlobalScalarFieldEnum = (typeof ParametreGlobalScalarFieldEnum)[keyof typeof ParametreGlobalScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nom: 'nom',
    prenom: 'prenom',
    passwordHash: 'passwordHash',
    role: 'role',
    actif: 'actif',
    supprime: 'supprime',
    supprimeLe: 'supprimeLe',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StatutAffaire'
   */
  export type EnumStatutAffaireFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutAffaire'>
    


  /**
   * Reference to a field of type 'StatutAffaire[]'
   */
  export type ListEnumStatutAffaireFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutAffaire[]'>
    


  /**
   * Reference to a field of type 'TypeHeure'
   */
  export type EnumTypeHeureFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeHeure'>
    


  /**
   * Reference to a field of type 'TypeHeure[]'
   */
  export type ListEnumTypeHeureFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeHeure[]'>
    


  /**
   * Reference to a field of type 'RoleEnum'
   */
  export type EnumRoleEnumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleEnum'>
    


  /**
   * Reference to a field of type 'RoleEnum[]'
   */
  export type ListEnumRoleEnumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleEnum[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type AffaireWhereInput = {
    AND?: AffaireWhereInput | AffaireWhereInput[]
    OR?: AffaireWhereInput[]
    NOT?: AffaireWhereInput | AffaireWhereInput[]
    id?: StringFilter<"Affaire"> | string
    numero?: StringFilter<"Affaire"> | string
    libelle?: StringFilter<"Affaire"> | string
    client?: StringFilter<"Affaire"> | string
    adresse?: StringNullableFilter<"Affaire"> | string | null
    dateCreation?: DateTimeFilter<"Affaire"> | Date | string
    dateCloturePrevue?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    objectifCaHt?: FloatFilter<"Affaire"> | number
    objectifAchatHt?: FloatFilter<"Affaire"> | number
    objectifHeuresFab?: FloatFilter<"Affaire"> | number
    ser?: FloatFilter<"Affaire"> | number
    pose?: FloatFilter<"Affaire"> | number
    statut?: EnumStatutAffaireFilter<"Affaire"> | $Enums.StatutAffaire
    createdAt?: DateTimeFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeFilter<"Affaire"> | Date | string
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
  }

  export type AffaireOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    libelle?: SortOrder
    client?: SortOrder
    adresse?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    dateCloturePrevue?: SortOrderInput | SortOrder
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bdc?: BdcOrderByRelationAggregateInput
    pointages?: PointageOrderByRelationAggregateInput
  }

  export type AffaireWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: AffaireWhereInput | AffaireWhereInput[]
    OR?: AffaireWhereInput[]
    NOT?: AffaireWhereInput | AffaireWhereInput[]
    libelle?: StringFilter<"Affaire"> | string
    client?: StringFilter<"Affaire"> | string
    adresse?: StringNullableFilter<"Affaire"> | string | null
    dateCreation?: DateTimeFilter<"Affaire"> | Date | string
    dateCloturePrevue?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    objectifCaHt?: FloatFilter<"Affaire"> | number
    objectifAchatHt?: FloatFilter<"Affaire"> | number
    objectifHeuresFab?: FloatFilter<"Affaire"> | number
    ser?: FloatFilter<"Affaire"> | number
    pose?: FloatFilter<"Affaire"> | number
    statut?: EnumStatutAffaireFilter<"Affaire"> | $Enums.StatutAffaire
    createdAt?: DateTimeFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeFilter<"Affaire"> | Date | string
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
  }, "id" | "numero">

  export type AffaireOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    libelle?: SortOrder
    client?: SortOrder
    adresse?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    dateCloturePrevue?: SortOrderInput | SortOrder
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffaireCountOrderByAggregateInput
    _avg?: AffaireAvgOrderByAggregateInput
    _max?: AffaireMaxOrderByAggregateInput
    _min?: AffaireMinOrderByAggregateInput
    _sum?: AffaireSumOrderByAggregateInput
  }

  export type AffaireScalarWhereWithAggregatesInput = {
    AND?: AffaireScalarWhereWithAggregatesInput | AffaireScalarWhereWithAggregatesInput[]
    OR?: AffaireScalarWhereWithAggregatesInput[]
    NOT?: AffaireScalarWhereWithAggregatesInput | AffaireScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Affaire"> | string
    numero?: StringWithAggregatesFilter<"Affaire"> | string
    libelle?: StringWithAggregatesFilter<"Affaire"> | string
    client?: StringWithAggregatesFilter<"Affaire"> | string
    adresse?: StringNullableWithAggregatesFilter<"Affaire"> | string | null
    dateCreation?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
    dateCloturePrevue?: DateTimeNullableWithAggregatesFilter<"Affaire"> | Date | string | null
    objectifCaHt?: FloatWithAggregatesFilter<"Affaire"> | number
    objectifAchatHt?: FloatWithAggregatesFilter<"Affaire"> | number
    objectifHeuresFab?: FloatWithAggregatesFilter<"Affaire"> | number
    ser?: FloatWithAggregatesFilter<"Affaire"> | number
    pose?: FloatWithAggregatesFilter<"Affaire"> | number
    statut?: EnumStatutAffaireWithAggregatesFilter<"Affaire"> | $Enums.StatutAffaire
    createdAt?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
  }

  export type CategorieAchatWhereInput = {
    AND?: CategorieAchatWhereInput | CategorieAchatWhereInput[]
    OR?: CategorieAchatWhereInput[]
    NOT?: CategorieAchatWhereInput | CategorieAchatWhereInput[]
    id?: StringFilter<"CategorieAchat"> | string
    code?: StringFilter<"CategorieAchat"> | string
    intitule?: StringFilter<"CategorieAchat"> | string
    pourcentageFg?: FloatFilter<"CategorieAchat"> | number
    bdc?: BdcListRelationFilter
  }

  export type CategorieAchatOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    intitule?: SortOrder
    pourcentageFg?: SortOrder
    bdc?: BdcOrderByRelationAggregateInput
  }

  export type CategorieAchatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CategorieAchatWhereInput | CategorieAchatWhereInput[]
    OR?: CategorieAchatWhereInput[]
    NOT?: CategorieAchatWhereInput | CategorieAchatWhereInput[]
    intitule?: StringFilter<"CategorieAchat"> | string
    pourcentageFg?: FloatFilter<"CategorieAchat"> | number
    bdc?: BdcListRelationFilter
  }, "id" | "code">

  export type CategorieAchatOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    intitule?: SortOrder
    pourcentageFg?: SortOrder
    _count?: CategorieAchatCountOrderByAggregateInput
    _avg?: CategorieAchatAvgOrderByAggregateInput
    _max?: CategorieAchatMaxOrderByAggregateInput
    _min?: CategorieAchatMinOrderByAggregateInput
    _sum?: CategorieAchatSumOrderByAggregateInput
  }

  export type CategorieAchatScalarWhereWithAggregatesInput = {
    AND?: CategorieAchatScalarWhereWithAggregatesInput | CategorieAchatScalarWhereWithAggregatesInput[]
    OR?: CategorieAchatScalarWhereWithAggregatesInput[]
    NOT?: CategorieAchatScalarWhereWithAggregatesInput | CategorieAchatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CategorieAchat"> | string
    code?: StringWithAggregatesFilter<"CategorieAchat"> | string
    intitule?: StringWithAggregatesFilter<"CategorieAchat"> | string
    pourcentageFg?: FloatWithAggregatesFilter<"CategorieAchat"> | number
  }

  export type BdcWhereInput = {
    AND?: BdcWhereInput | BdcWhereInput[]
    OR?: BdcWhereInput[]
    NOT?: BdcWhereInput | BdcWhereInput[]
    id?: StringFilter<"Bdc"> | string
    numero?: StringFilter<"Bdc"> | string
    montantHt?: FloatFilter<"Bdc"> | number
    dateBdc?: DateTimeFilter<"Bdc"> | Date | string
    dateReception?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    commentaire?: StringNullableFilter<"Bdc"> | string | null
    affaireId?: StringFilter<"Bdc"> | string
    categorieId?: StringFilter<"Bdc"> | string
    fournisseur?: StringFilter<"Bdc"> | string
    montantFg?: FloatFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    categorie?: XOR<CategorieAchatScalarRelationFilter, CategorieAchatWhereInput>
  }

  export type BdcOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    montantHt?: SortOrder
    dateBdc?: SortOrder
    dateReception?: SortOrderInput | SortOrder
    commentaire?: SortOrderInput | SortOrder
    affaireId?: SortOrder
    categorieId?: SortOrder
    fournisseur?: SortOrder
    montantFg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    affaire?: AffaireOrderByWithRelationInput
    categorie?: CategorieAchatOrderByWithRelationInput
  }

  export type BdcWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: BdcWhereInput | BdcWhereInput[]
    OR?: BdcWhereInput[]
    NOT?: BdcWhereInput | BdcWhereInput[]
    montantHt?: FloatFilter<"Bdc"> | number
    dateBdc?: DateTimeFilter<"Bdc"> | Date | string
    dateReception?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    commentaire?: StringNullableFilter<"Bdc"> | string | null
    affaireId?: StringFilter<"Bdc"> | string
    categorieId?: StringFilter<"Bdc"> | string
    fournisseur?: StringFilter<"Bdc"> | string
    montantFg?: FloatFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    categorie?: XOR<CategorieAchatScalarRelationFilter, CategorieAchatWhereInput>
  }, "id" | "numero">

  export type BdcOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    montantHt?: SortOrder
    dateBdc?: SortOrder
    dateReception?: SortOrderInput | SortOrder
    commentaire?: SortOrderInput | SortOrder
    affaireId?: SortOrder
    categorieId?: SortOrder
    fournisseur?: SortOrder
    montantFg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BdcCountOrderByAggregateInput
    _avg?: BdcAvgOrderByAggregateInput
    _max?: BdcMaxOrderByAggregateInput
    _min?: BdcMinOrderByAggregateInput
    _sum?: BdcSumOrderByAggregateInput
  }

  export type BdcScalarWhereWithAggregatesInput = {
    AND?: BdcScalarWhereWithAggregatesInput | BdcScalarWhereWithAggregatesInput[]
    OR?: BdcScalarWhereWithAggregatesInput[]
    NOT?: BdcScalarWhereWithAggregatesInput | BdcScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bdc"> | string
    numero?: StringWithAggregatesFilter<"Bdc"> | string
    montantHt?: FloatWithAggregatesFilter<"Bdc"> | number
    dateBdc?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
    dateReception?: DateTimeNullableWithAggregatesFilter<"Bdc"> | Date | string | null
    commentaire?: StringNullableWithAggregatesFilter<"Bdc"> | string | null
    affaireId?: StringWithAggregatesFilter<"Bdc"> | string
    categorieId?: StringWithAggregatesFilter<"Bdc"> | string
    fournisseur?: StringWithAggregatesFilter<"Bdc"> | string
    montantFg?: FloatWithAggregatesFilter<"Bdc"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
  }

  export type PointageWhereInput = {
    AND?: PointageWhereInput | PointageWhereInput[]
    OR?: PointageWhereInput[]
    NOT?: PointageWhereInput | PointageWhereInput[]
    id?: StringFilter<"Pointage"> | string
    datePointage?: DateTimeFilter<"Pointage"> | Date | string
    nbHeures?: FloatFilter<"Pointage"> | number
    commentaire?: StringNullableFilter<"Pointage"> | string | null
    typeHeure?: EnumTypeHeureFilter<"Pointage"> | $Enums.TypeHeure
    affaireId?: StringFilter<"Pointage"> | string
    userId?: StringFilter<"Pointage"> | string
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PointageOrderByWithRelationInput = {
    id?: SortOrder
    datePointage?: SortOrder
    nbHeures?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    typeHeure?: SortOrder
    affaireId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    affaire?: AffaireOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PointageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointageWhereInput | PointageWhereInput[]
    OR?: PointageWhereInput[]
    NOT?: PointageWhereInput | PointageWhereInput[]
    datePointage?: DateTimeFilter<"Pointage"> | Date | string
    nbHeures?: FloatFilter<"Pointage"> | number
    commentaire?: StringNullableFilter<"Pointage"> | string | null
    typeHeure?: EnumTypeHeureFilter<"Pointage"> | $Enums.TypeHeure
    affaireId?: StringFilter<"Pointage"> | string
    userId?: StringFilter<"Pointage"> | string
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PointageOrderByWithAggregationInput = {
    id?: SortOrder
    datePointage?: SortOrder
    nbHeures?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    typeHeure?: SortOrder
    affaireId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PointageCountOrderByAggregateInput
    _avg?: PointageAvgOrderByAggregateInput
    _max?: PointageMaxOrderByAggregateInput
    _min?: PointageMinOrderByAggregateInput
    _sum?: PointageSumOrderByAggregateInput
  }

  export type PointageScalarWhereWithAggregatesInput = {
    AND?: PointageScalarWhereWithAggregatesInput | PointageScalarWhereWithAggregatesInput[]
    OR?: PointageScalarWhereWithAggregatesInput[]
    NOT?: PointageScalarWhereWithAggregatesInput | PointageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pointage"> | string
    datePointage?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
    nbHeures?: FloatWithAggregatesFilter<"Pointage"> | number
    commentaire?: StringNullableWithAggregatesFilter<"Pointage"> | string | null
    typeHeure?: EnumTypeHeureWithAggregatesFilter<"Pointage"> | $Enums.TypeHeure
    affaireId?: StringWithAggregatesFilter<"Pointage"> | string
    userId?: StringWithAggregatesFilter<"Pointage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
  }

  export type ParametreGlobalWhereInput = {
    AND?: ParametreGlobalWhereInput | ParametreGlobalWhereInput[]
    OR?: ParametreGlobalWhereInput[]
    NOT?: ParametreGlobalWhereInput | ParametreGlobalWhereInput[]
    id?: StringFilter<"ParametreGlobal"> | string
    cle?: StringFilter<"ParametreGlobal"> | string
    valeur?: StringFilter<"ParametreGlobal"> | string
    description?: StringNullableFilter<"ParametreGlobal"> | string | null
    createdAt?: DateTimeFilter<"ParametreGlobal"> | Date | string
    updatedAt?: DateTimeFilter<"ParametreGlobal"> | Date | string
  }

  export type ParametreGlobalOrderByWithRelationInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParametreGlobalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cle?: string
    AND?: ParametreGlobalWhereInput | ParametreGlobalWhereInput[]
    OR?: ParametreGlobalWhereInput[]
    NOT?: ParametreGlobalWhereInput | ParametreGlobalWhereInput[]
    valeur?: StringFilter<"ParametreGlobal"> | string
    description?: StringNullableFilter<"ParametreGlobal"> | string | null
    createdAt?: DateTimeFilter<"ParametreGlobal"> | Date | string
    updatedAt?: DateTimeFilter<"ParametreGlobal"> | Date | string
  }, "id" | "cle">

  export type ParametreGlobalOrderByWithAggregationInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParametreGlobalCountOrderByAggregateInput
    _max?: ParametreGlobalMaxOrderByAggregateInput
    _min?: ParametreGlobalMinOrderByAggregateInput
  }

  export type ParametreGlobalScalarWhereWithAggregatesInput = {
    AND?: ParametreGlobalScalarWhereWithAggregatesInput | ParametreGlobalScalarWhereWithAggregatesInput[]
    OR?: ParametreGlobalScalarWhereWithAggregatesInput[]
    NOT?: ParametreGlobalScalarWhereWithAggregatesInput | ParametreGlobalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ParametreGlobal"> | string
    cle?: StringWithAggregatesFilter<"ParametreGlobal"> | string
    valeur?: StringWithAggregatesFilter<"ParametreGlobal"> | string
    description?: StringNullableWithAggregatesFilter<"ParametreGlobal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ParametreGlobal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ParametreGlobal"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleEnumFilter<"User"> | $Enums.RoleEnum
    actif?: BoolFilter<"User"> | boolean
    supprime?: BoolFilter<"User"> | boolean
    supprimeLe?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    pointages?: PointageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    supprime?: SortOrder
    supprimeLe?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pointages?: PointageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleEnumFilter<"User"> | $Enums.RoleEnum
    actif?: BoolFilter<"User"> | boolean
    supprime?: BoolFilter<"User"> | boolean
    supprimeLe?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    pointages?: PointageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    supprime?: SortOrder
    supprimeLe?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleEnumWithAggregatesFilter<"User"> | $Enums.RoleEnum
    actif?: BoolWithAggregatesFilter<"User"> | boolean
    supprime?: BoolWithAggregatesFilter<"User"> | boolean
    supprimeLe?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AffaireCreateInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcCreateNestedManyWithoutAffaireInput
    pointages?: PointageCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutAffaireInput
    pointages?: PointageUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireCreateManyInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffaireUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffaireUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategorieAchatCreateInput = {
    id?: string
    code: string
    intitule: string
    pourcentageFg: number
    bdc?: BdcCreateNestedManyWithoutCategorieInput
  }

  export type CategorieAchatUncheckedCreateInput = {
    id?: string
    code: string
    intitule: string
    pourcentageFg: number
    bdc?: BdcUncheckedCreateNestedManyWithoutCategorieInput
  }

  export type CategorieAchatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
    bdc?: BdcUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieAchatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
    bdc?: BdcUncheckedUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieAchatCreateManyInput = {
    id?: string
    code: string
    intitule: string
    pourcentageFg: number
  }

  export type CategorieAchatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
  }

  export type CategorieAchatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
  }

  export type BdcCreateInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutBdcInput
    categorie: CategorieAchatCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    affaireId: string
    categorieId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutBdcNestedInput
    categorie?: CategorieAchatUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    affaireId?: StringFieldUpdateOperationsInput | string
    categorieId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcCreateManyInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    affaireId: string
    categorieId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    affaireId?: StringFieldUpdateOperationsInput | string
    categorieId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutPointagesInput
    user: UserCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    affaireId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutPointagesNestedInput
    user?: UserUpdateOneRequiredWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    affaireId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateManyInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    affaireId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    affaireId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParametreGlobalCreateInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParametreGlobalUncheckedCreateInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParametreGlobalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParametreGlobalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParametreGlobalCreateManyInput = {
    id?: string
    cle: string
    valeur: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParametreGlobalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParametreGlobalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cle?: StringFieldUpdateOperationsInput | string
    valeur?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif?: boolean
    supprime?: boolean
    supprimeLe?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pointages?: PointageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif?: boolean
    supprime?: boolean
    supprimeLe?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pointages?: PointageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointages?: PointageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointages?: PointageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif?: boolean
    supprime?: boolean
    supprimeLe?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumStatutAffaireFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutAffaire | EnumStatutAffaireFieldRefInput<$PrismaModel>
    in?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutAffaireFilter<$PrismaModel> | $Enums.StatutAffaire
  }

  export type BdcListRelationFilter = {
    every?: BdcWhereInput
    some?: BdcWhereInput
    none?: BdcWhereInput
  }

  export type PointageListRelationFilter = {
    every?: PointageWhereInput
    some?: PointageWhereInput
    none?: PointageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BdcOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PointageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AffaireCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    libelle?: SortOrder
    client?: SortOrder
    adresse?: SortOrder
    dateCreation?: SortOrder
    dateCloturePrevue?: SortOrder
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireAvgOrderByAggregateInput = {
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
  }

  export type AffaireMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    libelle?: SortOrder
    client?: SortOrder
    adresse?: SortOrder
    dateCreation?: SortOrder
    dateCloturePrevue?: SortOrder
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    libelle?: SortOrder
    client?: SortOrder
    adresse?: SortOrder
    dateCreation?: SortOrder
    dateCloturePrevue?: SortOrder
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireSumOrderByAggregateInput = {
    objectifCaHt?: SortOrder
    objectifAchatHt?: SortOrder
    objectifHeuresFab?: SortOrder
    ser?: SortOrder
    pose?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumStatutAffaireWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutAffaire | EnumStatutAffaireFieldRefInput<$PrismaModel>
    in?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutAffaireWithAggregatesFilter<$PrismaModel> | $Enums.StatutAffaire
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutAffaireFilter<$PrismaModel>
    _max?: NestedEnumStatutAffaireFilter<$PrismaModel>
  }

  export type CategorieAchatCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    intitule?: SortOrder
    pourcentageFg?: SortOrder
  }

  export type CategorieAchatAvgOrderByAggregateInput = {
    pourcentageFg?: SortOrder
  }

  export type CategorieAchatMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    intitule?: SortOrder
    pourcentageFg?: SortOrder
  }

  export type CategorieAchatMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    intitule?: SortOrder
    pourcentageFg?: SortOrder
  }

  export type CategorieAchatSumOrderByAggregateInput = {
    pourcentageFg?: SortOrder
  }

  export type AffaireScalarRelationFilter = {
    is?: AffaireWhereInput
    isNot?: AffaireWhereInput
  }

  export type CategorieAchatScalarRelationFilter = {
    is?: CategorieAchatWhereInput
    isNot?: CategorieAchatWhereInput
  }

  export type BdcCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    montantHt?: SortOrder
    dateBdc?: SortOrder
    dateReception?: SortOrder
    commentaire?: SortOrder
    affaireId?: SortOrder
    categorieId?: SortOrder
    fournisseur?: SortOrder
    montantFg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcAvgOrderByAggregateInput = {
    montantHt?: SortOrder
    montantFg?: SortOrder
  }

  export type BdcMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    montantHt?: SortOrder
    dateBdc?: SortOrder
    dateReception?: SortOrder
    commentaire?: SortOrder
    affaireId?: SortOrder
    categorieId?: SortOrder
    fournisseur?: SortOrder
    montantFg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    montantHt?: SortOrder
    dateBdc?: SortOrder
    dateReception?: SortOrder
    commentaire?: SortOrder
    affaireId?: SortOrder
    categorieId?: SortOrder
    fournisseur?: SortOrder
    montantFg?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcSumOrderByAggregateInput = {
    montantHt?: SortOrder
    montantFg?: SortOrder
  }

  export type EnumTypeHeureFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeHeure | EnumTypeHeureFieldRefInput<$PrismaModel>
    in?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeHeureFilter<$PrismaModel> | $Enums.TypeHeure
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PointageCountOrderByAggregateInput = {
    id?: SortOrder
    datePointage?: SortOrder
    nbHeures?: SortOrder
    commentaire?: SortOrder
    typeHeure?: SortOrder
    affaireId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageAvgOrderByAggregateInput = {
    nbHeures?: SortOrder
  }

  export type PointageMaxOrderByAggregateInput = {
    id?: SortOrder
    datePointage?: SortOrder
    nbHeures?: SortOrder
    commentaire?: SortOrder
    typeHeure?: SortOrder
    affaireId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageMinOrderByAggregateInput = {
    id?: SortOrder
    datePointage?: SortOrder
    nbHeures?: SortOrder
    commentaire?: SortOrder
    typeHeure?: SortOrder
    affaireId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageSumOrderByAggregateInput = {
    nbHeures?: SortOrder
  }

  export type EnumTypeHeureWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeHeure | EnumTypeHeureFieldRefInput<$PrismaModel>
    in?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeHeureWithAggregatesFilter<$PrismaModel> | $Enums.TypeHeure
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeHeureFilter<$PrismaModel>
    _max?: NestedEnumTypeHeureFilter<$PrismaModel>
  }

  export type ParametreGlobalCountOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParametreGlobalMaxOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParametreGlobalMinOrderByAggregateInput = {
    id?: SortOrder
    cle?: SortOrder
    valeur?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleEnumFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEnum | EnumRoleEnumFieldRefInput<$PrismaModel>
    in?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleEnumFilter<$PrismaModel> | $Enums.RoleEnum
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    supprime?: SortOrder
    supprimeLe?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    supprime?: SortOrder
    supprimeLe?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    supprime?: SortOrder
    supprimeLe?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleEnumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEnum | EnumRoleEnumFieldRefInput<$PrismaModel>
    in?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleEnumWithAggregatesFilter<$PrismaModel> | $Enums.RoleEnum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleEnumFilter<$PrismaModel>
    _max?: NestedEnumRoleEnumFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BdcCreateNestedManyWithoutAffaireInput = {
    create?: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput> | BdcCreateWithoutAffaireInput[] | BdcUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutAffaireInput | BdcCreateOrConnectWithoutAffaireInput[]
    createMany?: BdcCreateManyAffaireInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type PointageCreateNestedManyWithoutAffaireInput = {
    create?: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput> | PointageCreateWithoutAffaireInput[] | PointageUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutAffaireInput | PointageCreateOrConnectWithoutAffaireInput[]
    createMany?: PointageCreateManyAffaireInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type BdcUncheckedCreateNestedManyWithoutAffaireInput = {
    create?: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput> | BdcCreateWithoutAffaireInput[] | BdcUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutAffaireInput | BdcCreateOrConnectWithoutAffaireInput[]
    createMany?: BdcCreateManyAffaireInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type PointageUncheckedCreateNestedManyWithoutAffaireInput = {
    create?: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput> | PointageCreateWithoutAffaireInput[] | PointageUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutAffaireInput | PointageCreateOrConnectWithoutAffaireInput[]
    createMany?: PointageCreateManyAffaireInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatutAffaireFieldUpdateOperationsInput = {
    set?: $Enums.StatutAffaire
  }

  export type BdcUpdateManyWithoutAffaireNestedInput = {
    create?: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput> | BdcCreateWithoutAffaireInput[] | BdcUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutAffaireInput | BdcCreateOrConnectWithoutAffaireInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutAffaireInput | BdcUpsertWithWhereUniqueWithoutAffaireInput[]
    createMany?: BdcCreateManyAffaireInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutAffaireInput | BdcUpdateWithWhereUniqueWithoutAffaireInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutAffaireInput | BdcUpdateManyWithWhereWithoutAffaireInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type PointageUpdateManyWithoutAffaireNestedInput = {
    create?: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput> | PointageCreateWithoutAffaireInput[] | PointageUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutAffaireInput | PointageCreateOrConnectWithoutAffaireInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutAffaireInput | PointageUpsertWithWhereUniqueWithoutAffaireInput[]
    createMany?: PointageCreateManyAffaireInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutAffaireInput | PointageUpdateWithWhereUniqueWithoutAffaireInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutAffaireInput | PointageUpdateManyWithWhereWithoutAffaireInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type BdcUncheckedUpdateManyWithoutAffaireNestedInput = {
    create?: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput> | BdcCreateWithoutAffaireInput[] | BdcUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutAffaireInput | BdcCreateOrConnectWithoutAffaireInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutAffaireInput | BdcUpsertWithWhereUniqueWithoutAffaireInput[]
    createMany?: BdcCreateManyAffaireInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutAffaireInput | BdcUpdateWithWhereUniqueWithoutAffaireInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutAffaireInput | BdcUpdateManyWithWhereWithoutAffaireInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type PointageUncheckedUpdateManyWithoutAffaireNestedInput = {
    create?: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput> | PointageCreateWithoutAffaireInput[] | PointageUncheckedCreateWithoutAffaireInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutAffaireInput | PointageCreateOrConnectWithoutAffaireInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutAffaireInput | PointageUpsertWithWhereUniqueWithoutAffaireInput[]
    createMany?: PointageCreateManyAffaireInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutAffaireInput | PointageUpdateWithWhereUniqueWithoutAffaireInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutAffaireInput | PointageUpdateManyWithWhereWithoutAffaireInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type BdcCreateNestedManyWithoutCategorieInput = {
    create?: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput> | BdcCreateWithoutCategorieInput[] | BdcUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCategorieInput | BdcCreateOrConnectWithoutCategorieInput[]
    createMany?: BdcCreateManyCategorieInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type BdcUncheckedCreateNestedManyWithoutCategorieInput = {
    create?: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput> | BdcCreateWithoutCategorieInput[] | BdcUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCategorieInput | BdcCreateOrConnectWithoutCategorieInput[]
    createMany?: BdcCreateManyCategorieInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type BdcUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput> | BdcCreateWithoutCategorieInput[] | BdcUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCategorieInput | BdcCreateOrConnectWithoutCategorieInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutCategorieInput | BdcUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: BdcCreateManyCategorieInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutCategorieInput | BdcUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutCategorieInput | BdcUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type BdcUncheckedUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput> | BdcCreateWithoutCategorieInput[] | BdcUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCategorieInput | BdcCreateOrConnectWithoutCategorieInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutCategorieInput | BdcUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: BdcCreateManyCategorieInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutCategorieInput | BdcUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutCategorieInput | BdcUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type AffaireCreateNestedOneWithoutBdcInput = {
    create?: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutBdcInput
    connect?: AffaireWhereUniqueInput
  }

  export type CategorieAchatCreateNestedOneWithoutBdcInput = {
    create?: XOR<CategorieAchatCreateWithoutBdcInput, CategorieAchatUncheckedCreateWithoutBdcInput>
    connectOrCreate?: CategorieAchatCreateOrConnectWithoutBdcInput
    connect?: CategorieAchatWhereUniqueInput
  }

  export type AffaireUpdateOneRequiredWithoutBdcNestedInput = {
    create?: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutBdcInput
    upsert?: AffaireUpsertWithoutBdcInput
    connect?: AffaireWhereUniqueInput
    update?: XOR<XOR<AffaireUpdateToOneWithWhereWithoutBdcInput, AffaireUpdateWithoutBdcInput>, AffaireUncheckedUpdateWithoutBdcInput>
  }

  export type CategorieAchatUpdateOneRequiredWithoutBdcNestedInput = {
    create?: XOR<CategorieAchatCreateWithoutBdcInput, CategorieAchatUncheckedCreateWithoutBdcInput>
    connectOrCreate?: CategorieAchatCreateOrConnectWithoutBdcInput
    upsert?: CategorieAchatUpsertWithoutBdcInput
    connect?: CategorieAchatWhereUniqueInput
    update?: XOR<XOR<CategorieAchatUpdateToOneWithWhereWithoutBdcInput, CategorieAchatUpdateWithoutBdcInput>, CategorieAchatUncheckedUpdateWithoutBdcInput>
  }

  export type AffaireCreateNestedOneWithoutPointagesInput = {
    create?: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutPointagesInput
    connect?: AffaireWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPointagesInput = {
    create?: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTypeHeureFieldUpdateOperationsInput = {
    set?: $Enums.TypeHeure
  }

  export type AffaireUpdateOneRequiredWithoutPointagesNestedInput = {
    create?: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutPointagesInput
    upsert?: AffaireUpsertWithoutPointagesInput
    connect?: AffaireWhereUniqueInput
    update?: XOR<XOR<AffaireUpdateToOneWithWhereWithoutPointagesInput, AffaireUpdateWithoutPointagesInput>, AffaireUncheckedUpdateWithoutPointagesInput>
  }

  export type UserUpdateOneRequiredWithoutPointagesNestedInput = {
    create?: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointagesInput
    upsert?: UserUpsertWithoutPointagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPointagesInput, UserUpdateWithoutPointagesInput>, UserUncheckedUpdateWithoutPointagesInput>
  }

  export type PointageCreateNestedManyWithoutUserInput = {
    create?: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput> | PointageCreateWithoutUserInput[] | PointageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUserInput | PointageCreateOrConnectWithoutUserInput[]
    createMany?: PointageCreateManyUserInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type PointageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput> | PointageCreateWithoutUserInput[] | PointageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUserInput | PointageCreateOrConnectWithoutUserInput[]
    createMany?: PointageCreateManyUserInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type EnumRoleEnumFieldUpdateOperationsInput = {
    set?: $Enums.RoleEnum
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PointageUpdateManyWithoutUserNestedInput = {
    create?: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput> | PointageCreateWithoutUserInput[] | PointageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUserInput | PointageCreateOrConnectWithoutUserInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutUserInput | PointageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PointageCreateManyUserInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutUserInput | PointageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutUserInput | PointageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type PointageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput> | PointageCreateWithoutUserInput[] | PointageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUserInput | PointageCreateOrConnectWithoutUserInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutUserInput | PointageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PointageCreateManyUserInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutUserInput | PointageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutUserInput | PointageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatutAffaireFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutAffaire | EnumStatutAffaireFieldRefInput<$PrismaModel>
    in?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutAffaireFilter<$PrismaModel> | $Enums.StatutAffaire
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumStatutAffaireWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutAffaire | EnumStatutAffaireFieldRefInput<$PrismaModel>
    in?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutAffaire[] | ListEnumStatutAffaireFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutAffaireWithAggregatesFilter<$PrismaModel> | $Enums.StatutAffaire
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutAffaireFilter<$PrismaModel>
    _max?: NestedEnumStatutAffaireFilter<$PrismaModel>
  }

  export type NestedEnumTypeHeureFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeHeure | EnumTypeHeureFieldRefInput<$PrismaModel>
    in?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeHeureFilter<$PrismaModel> | $Enums.TypeHeure
  }

  export type NestedEnumTypeHeureWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeHeure | EnumTypeHeureFieldRefInput<$PrismaModel>
    in?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeHeure[] | ListEnumTypeHeureFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeHeureWithAggregatesFilter<$PrismaModel> | $Enums.TypeHeure
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeHeureFilter<$PrismaModel>
    _max?: NestedEnumTypeHeureFilter<$PrismaModel>
  }

  export type NestedEnumRoleEnumFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEnum | EnumRoleEnumFieldRefInput<$PrismaModel>
    in?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleEnumFilter<$PrismaModel> | $Enums.RoleEnum
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleEnumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleEnum | EnumRoleEnumFieldRefInput<$PrismaModel>
    in?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleEnum[] | ListEnumRoleEnumFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleEnumWithAggregatesFilter<$PrismaModel> | $Enums.RoleEnum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleEnumFilter<$PrismaModel>
    _max?: NestedEnumRoleEnumFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BdcCreateWithoutAffaireInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categorie: CategorieAchatCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateWithoutAffaireInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    categorieId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcCreateOrConnectWithoutAffaireInput = {
    where: BdcWhereUniqueInput
    create: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput>
  }

  export type BdcCreateManyAffaireInputEnvelope = {
    data: BdcCreateManyAffaireInput | BdcCreateManyAffaireInput[]
    skipDuplicates?: boolean
  }

  export type PointageCreateWithoutAffaireInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateWithoutAffaireInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateOrConnectWithoutAffaireInput = {
    where: PointageWhereUniqueInput
    create: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput>
  }

  export type PointageCreateManyAffaireInputEnvelope = {
    data: PointageCreateManyAffaireInput | PointageCreateManyAffaireInput[]
    skipDuplicates?: boolean
  }

  export type BdcUpsertWithWhereUniqueWithoutAffaireInput = {
    where: BdcWhereUniqueInput
    update: XOR<BdcUpdateWithoutAffaireInput, BdcUncheckedUpdateWithoutAffaireInput>
    create: XOR<BdcCreateWithoutAffaireInput, BdcUncheckedCreateWithoutAffaireInput>
  }

  export type BdcUpdateWithWhereUniqueWithoutAffaireInput = {
    where: BdcWhereUniqueInput
    data: XOR<BdcUpdateWithoutAffaireInput, BdcUncheckedUpdateWithoutAffaireInput>
  }

  export type BdcUpdateManyWithWhereWithoutAffaireInput = {
    where: BdcScalarWhereInput
    data: XOR<BdcUpdateManyMutationInput, BdcUncheckedUpdateManyWithoutAffaireInput>
  }

  export type BdcScalarWhereInput = {
    AND?: BdcScalarWhereInput | BdcScalarWhereInput[]
    OR?: BdcScalarWhereInput[]
    NOT?: BdcScalarWhereInput | BdcScalarWhereInput[]
    id?: StringFilter<"Bdc"> | string
    numero?: StringFilter<"Bdc"> | string
    montantHt?: FloatFilter<"Bdc"> | number
    dateBdc?: DateTimeFilter<"Bdc"> | Date | string
    dateReception?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    commentaire?: StringNullableFilter<"Bdc"> | string | null
    affaireId?: StringFilter<"Bdc"> | string
    categorieId?: StringFilter<"Bdc"> | string
    fournisseur?: StringFilter<"Bdc"> | string
    montantFg?: FloatFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
  }

  export type PointageUpsertWithWhereUniqueWithoutAffaireInput = {
    where: PointageWhereUniqueInput
    update: XOR<PointageUpdateWithoutAffaireInput, PointageUncheckedUpdateWithoutAffaireInput>
    create: XOR<PointageCreateWithoutAffaireInput, PointageUncheckedCreateWithoutAffaireInput>
  }

  export type PointageUpdateWithWhereUniqueWithoutAffaireInput = {
    where: PointageWhereUniqueInput
    data: XOR<PointageUpdateWithoutAffaireInput, PointageUncheckedUpdateWithoutAffaireInput>
  }

  export type PointageUpdateManyWithWhereWithoutAffaireInput = {
    where: PointageScalarWhereInput
    data: XOR<PointageUpdateManyMutationInput, PointageUncheckedUpdateManyWithoutAffaireInput>
  }

  export type PointageScalarWhereInput = {
    AND?: PointageScalarWhereInput | PointageScalarWhereInput[]
    OR?: PointageScalarWhereInput[]
    NOT?: PointageScalarWhereInput | PointageScalarWhereInput[]
    id?: StringFilter<"Pointage"> | string
    datePointage?: DateTimeFilter<"Pointage"> | Date | string
    nbHeures?: FloatFilter<"Pointage"> | number
    commentaire?: StringNullableFilter<"Pointage"> | string | null
    typeHeure?: EnumTypeHeureFilter<"Pointage"> | $Enums.TypeHeure
    affaireId?: StringFilter<"Pointage"> | string
    userId?: StringFilter<"Pointage"> | string
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
  }

  export type BdcCreateWithoutCategorieInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateWithoutCategorieInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    affaireId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcCreateOrConnectWithoutCategorieInput = {
    where: BdcWhereUniqueInput
    create: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput>
  }

  export type BdcCreateManyCategorieInputEnvelope = {
    data: BdcCreateManyCategorieInput | BdcCreateManyCategorieInput[]
    skipDuplicates?: boolean
  }

  export type BdcUpsertWithWhereUniqueWithoutCategorieInput = {
    where: BdcWhereUniqueInput
    update: XOR<BdcUpdateWithoutCategorieInput, BdcUncheckedUpdateWithoutCategorieInput>
    create: XOR<BdcCreateWithoutCategorieInput, BdcUncheckedCreateWithoutCategorieInput>
  }

  export type BdcUpdateWithWhereUniqueWithoutCategorieInput = {
    where: BdcWhereUniqueInput
    data: XOR<BdcUpdateWithoutCategorieInput, BdcUncheckedUpdateWithoutCategorieInput>
  }

  export type BdcUpdateManyWithWhereWithoutCategorieInput = {
    where: BdcScalarWhereInput
    data: XOR<BdcUpdateManyMutationInput, BdcUncheckedUpdateManyWithoutCategorieInput>
  }

  export type AffaireCreateWithoutBdcInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    pointages?: PointageCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateWithoutBdcInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    pointages?: PointageUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireCreateOrConnectWithoutBdcInput = {
    where: AffaireWhereUniqueInput
    create: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
  }

  export type CategorieAchatCreateWithoutBdcInput = {
    id?: string
    code: string
    intitule: string
    pourcentageFg: number
  }

  export type CategorieAchatUncheckedCreateWithoutBdcInput = {
    id?: string
    code: string
    intitule: string
    pourcentageFg: number
  }

  export type CategorieAchatCreateOrConnectWithoutBdcInput = {
    where: CategorieAchatWhereUniqueInput
    create: XOR<CategorieAchatCreateWithoutBdcInput, CategorieAchatUncheckedCreateWithoutBdcInput>
  }

  export type AffaireUpsertWithoutBdcInput = {
    update: XOR<AffaireUpdateWithoutBdcInput, AffaireUncheckedUpdateWithoutBdcInput>
    create: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
    where?: AffaireWhereInput
  }

  export type AffaireUpdateToOneWithWhereWithoutBdcInput = {
    where?: AffaireWhereInput
    data: XOR<AffaireUpdateWithoutBdcInput, AffaireUncheckedUpdateWithoutBdcInput>
  }

  export type AffaireUpdateWithoutBdcInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointages?: PointageUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateWithoutBdcInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointages?: PointageUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type CategorieAchatUpsertWithoutBdcInput = {
    update: XOR<CategorieAchatUpdateWithoutBdcInput, CategorieAchatUncheckedUpdateWithoutBdcInput>
    create: XOR<CategorieAchatCreateWithoutBdcInput, CategorieAchatUncheckedCreateWithoutBdcInput>
    where?: CategorieAchatWhereInput
  }

  export type CategorieAchatUpdateToOneWithWhereWithoutBdcInput = {
    where?: CategorieAchatWhereInput
    data: XOR<CategorieAchatUpdateWithoutBdcInput, CategorieAchatUncheckedUpdateWithoutBdcInput>
  }

  export type CategorieAchatUpdateWithoutBdcInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
  }

  export type CategorieAchatUncheckedUpdateWithoutBdcInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    intitule?: StringFieldUpdateOperationsInput | string
    pourcentageFg?: FloatFieldUpdateOperationsInput | number
  }

  export type AffaireCreateWithoutPointagesInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateWithoutPointagesInput = {
    id?: string
    numero: string
    libelle: string
    client: string
    adresse?: string | null
    dateCreation?: Date | string
    dateCloturePrevue?: Date | string | null
    objectifCaHt: number
    objectifAchatHt: number
    objectifHeuresFab: number
    ser?: number
    pose?: number
    statut?: $Enums.StatutAffaire
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireCreateOrConnectWithoutPointagesInput = {
    where: AffaireWhereUniqueInput
    create: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
  }

  export type UserCreateWithoutPointagesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif?: boolean
    supprime?: boolean
    supprimeLe?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPointagesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    passwordHash: string
    role: $Enums.RoleEnum
    actif?: boolean
    supprime?: boolean
    supprimeLe?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPointagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
  }

  export type AffaireUpsertWithoutPointagesInput = {
    update: XOR<AffaireUpdateWithoutPointagesInput, AffaireUncheckedUpdateWithoutPointagesInput>
    create: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
    where?: AffaireWhereInput
  }

  export type AffaireUpdateToOneWithWhereWithoutPointagesInput = {
    where?: AffaireWhereInput
    data: XOR<AffaireUpdateWithoutPointagesInput, AffaireUncheckedUpdateWithoutPointagesInput>
  }

  export type AffaireUpdateWithoutPointagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateWithoutPointagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    client?: StringFieldUpdateOperationsInput | string
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCloturePrevue?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    objectifCaHt?: FloatFieldUpdateOperationsInput | number
    objectifAchatHt?: FloatFieldUpdateOperationsInput | number
    objectifHeuresFab?: FloatFieldUpdateOperationsInput | number
    ser?: FloatFieldUpdateOperationsInput | number
    pose?: FloatFieldUpdateOperationsInput | number
    statut?: EnumStatutAffaireFieldUpdateOperationsInput | $Enums.StatutAffaire
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type UserUpsertWithoutPointagesInput = {
    update: XOR<UserUpdateWithoutPointagesInput, UserUncheckedUpdateWithoutPointagesInput>
    create: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPointagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPointagesInput, UserUncheckedUpdateWithoutPointagesInput>
  }

  export type UserUpdateWithoutPointagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPointagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleEnumFieldUpdateOperationsInput | $Enums.RoleEnum
    actif?: BoolFieldUpdateOperationsInput | boolean
    supprime?: BoolFieldUpdateOperationsInput | boolean
    supprimeLe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateWithoutUserInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateWithoutUserInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    affaireId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateOrConnectWithoutUserInput = {
    where: PointageWhereUniqueInput
    create: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput>
  }

  export type PointageCreateManyUserInputEnvelope = {
    data: PointageCreateManyUserInput | PointageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PointageUpsertWithWhereUniqueWithoutUserInput = {
    where: PointageWhereUniqueInput
    update: XOR<PointageUpdateWithoutUserInput, PointageUncheckedUpdateWithoutUserInput>
    create: XOR<PointageCreateWithoutUserInput, PointageUncheckedCreateWithoutUserInput>
  }

  export type PointageUpdateWithWhereUniqueWithoutUserInput = {
    where: PointageWhereUniqueInput
    data: XOR<PointageUpdateWithoutUserInput, PointageUncheckedUpdateWithoutUserInput>
  }

  export type PointageUpdateManyWithWhereWithoutUserInput = {
    where: PointageScalarWhereInput
    data: XOR<PointageUpdateManyMutationInput, PointageUncheckedUpdateManyWithoutUserInput>
  }

  export type BdcCreateManyAffaireInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    categorieId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateManyAffaireInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorie?: CategorieAchatUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    categorieId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    categorieId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUpdateWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyWithoutAffaireInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcCreateManyCategorieInput = {
    id?: string
    numero: string
    montantHt: number
    dateBdc?: Date | string
    dateReception?: Date | string | null
    commentaire?: string | null
    affaireId: string
    fournisseur: string
    montantFg?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    affaireId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyWithoutCategorieInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    montantHt?: FloatFieldUpdateOperationsInput | number
    dateBdc?: DateTimeFieldUpdateOperationsInput | Date | string
    dateReception?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    affaireId?: StringFieldUpdateOperationsInput | string
    fournisseur?: StringFieldUpdateOperationsInput | string
    montantFg?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateManyUserInput = {
    id?: string
    datePointage: Date | string
    nbHeures: number
    commentaire?: string | null
    typeHeure: $Enums.TypeHeure
    affaireId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    affaireId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    datePointage?: DateTimeFieldUpdateOperationsInput | Date | string
    nbHeures?: FloatFieldUpdateOperationsInput | number
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    typeHeure?: EnumTypeHeureFieldUpdateOperationsInput | $Enums.TypeHeure
    affaireId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
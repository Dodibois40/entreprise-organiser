
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Affaire
 * 
 */
export type Affaire = $Result.DefaultSelection<Prisma.$AffairePayload>
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
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;
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
  : T extends BigInt
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
    User: 'User',
    Affaire: 'Affaire',
    Bdc: 'Bdc',
    Pointage: 'Pointage',
    PasswordReset: 'PasswordReset'
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
      modelProps: "user" | "affaire" | "bdc" | "pointage" | "passwordReset"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
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
    user?: UserOmit
    affaire?: AffaireOmit
    bdc?: BdcOmit
    pointage?: PointageOmit
    passwordReset?: PasswordResetOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    affaires: number
    bdc: number
    pointages: number
    PasswordReset: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaires?: boolean | UserCountOutputTypeCountAffairesArgs
    bdc?: boolean | UserCountOutputTypeCountBdcArgs
    pointages?: boolean | UserCountOutputTypeCountPointagesArgs
    PasswordReset?: boolean | UserCountOutputTypeCountPasswordResetArgs
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
  export type UserCountOutputTypeCountAffairesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffaireWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BdcWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPointagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
  }


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
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    nom: string | null
    prenom: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    nom: string | null
    prenom: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    nom: number
    prenom: number
    password: number
    role: number
    actif: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    password?: true
    role?: true
    actif?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    nom: string | null
    prenom: string | null
    password: string
    role: $Enums.Role
    actif: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaires?: boolean | User$affairesArgs<ExtArgs>
    bdc?: boolean | User$bdcArgs<ExtArgs>
    pointages?: boolean | User$pointagesArgs<ExtArgs>
    PasswordReset?: boolean | User$PasswordResetArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "nom" | "prenom" | "password" | "role" | "actif" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaires?: boolean | User$affairesArgs<ExtArgs>
    bdc?: boolean | User$bdcArgs<ExtArgs>
    pointages?: boolean | User$pointagesArgs<ExtArgs>
    PasswordReset?: boolean | User$PasswordResetArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      affaires: Prisma.$AffairePayload<ExtArgs>[]
      bdc: Prisma.$BdcPayload<ExtArgs>[]
      pointages: Prisma.$PointagePayload<ExtArgs>[]
      PasswordReset: Prisma.$PasswordResetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      nom: string | null
      prenom: string | null
      password: string
      role: $Enums.Role
      actif: boolean
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
    affaires<T extends User$affairesArgs<ExtArgs> = {}>(args?: Subset<T, User$affairesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bdc<T extends User$bdcArgs<ExtArgs> = {}>(args?: Subset<T, User$bdcArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BdcPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pointages<T extends User$pointagesArgs<ExtArgs> = {}>(args?: Subset<T, User$pointagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PasswordReset<T extends User$PasswordResetArgs<ExtArgs> = {}>(args?: Subset<T, User$PasswordResetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly actif: FieldRef<"User", 'Boolean'>
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
   * User.affaires
   */
  export type User$affairesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: AffaireWhereInput
    orderBy?: AffaireOrderByWithRelationInput | AffaireOrderByWithRelationInput[]
    cursor?: AffaireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffaireScalarFieldEnum | AffaireScalarFieldEnum[]
  }

  /**
   * User.bdc
   */
  export type User$bdcArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * User.PasswordReset
   */
  export type User$PasswordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    cursor?: PasswordResetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
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
    id: number | null
    montantTotalHT: number | null
    margeEstimee: number | null
    creeParId: number | null
  }

  export type AffaireSumAggregateOutputType = {
    id: number | null
    montantTotalHT: number | null
    margeEstimee: number | null
    creeParId: number | null
  }

  export type AffaireMinAggregateOutputType = {
    id: number | null
    numeroAffaire: string | null
    nomChantier: string | null
    client: string | null
    statut: string | null
    montantTotalHT: number | null
    margeEstimee: number | null
    dateCreation: Date | null
    dateDebut: Date | null
    dateFinEstimee: Date | null
    dateFinReelle: Date | null
    creeParId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffaireMaxAggregateOutputType = {
    id: number | null
    numeroAffaire: string | null
    nomChantier: string | null
    client: string | null
    statut: string | null
    montantTotalHT: number | null
    margeEstimee: number | null
    dateCreation: Date | null
    dateDebut: Date | null
    dateFinEstimee: Date | null
    dateFinReelle: Date | null
    creeParId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffaireCountAggregateOutputType = {
    id: number
    numeroAffaire: number
    nomChantier: number
    client: number
    statut: number
    montantTotalHT: number
    margeEstimee: number
    dateCreation: number
    dateDebut: number
    dateFinEstimee: number
    dateFinReelle: number
    creeParId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffaireAvgAggregateInputType = {
    id?: true
    montantTotalHT?: true
    margeEstimee?: true
    creeParId?: true
  }

  export type AffaireSumAggregateInputType = {
    id?: true
    montantTotalHT?: true
    margeEstimee?: true
    creeParId?: true
  }

  export type AffaireMinAggregateInputType = {
    id?: true
    numeroAffaire?: true
    nomChantier?: true
    client?: true
    statut?: true
    montantTotalHT?: true
    margeEstimee?: true
    dateCreation?: true
    dateDebut?: true
    dateFinEstimee?: true
    dateFinReelle?: true
    creeParId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffaireMaxAggregateInputType = {
    id?: true
    numeroAffaire?: true
    nomChantier?: true
    client?: true
    statut?: true
    montantTotalHT?: true
    margeEstimee?: true
    dateCreation?: true
    dateDebut?: true
    dateFinEstimee?: true
    dateFinReelle?: true
    creeParId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffaireCountAggregateInputType = {
    id?: true
    numeroAffaire?: true
    nomChantier?: true
    client?: true
    statut?: true
    montantTotalHT?: true
    margeEstimee?: true
    dateCreation?: true
    dateDebut?: true
    dateFinEstimee?: true
    dateFinReelle?: true
    creeParId?: true
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
    id: number
    numeroAffaire: string
    nomChantier: string
    client: string | null
    statut: string
    montantTotalHT: number | null
    margeEstimee: number | null
    dateCreation: Date
    dateDebut: Date | null
    dateFinEstimee: Date | null
    dateFinReelle: Date | null
    creeParId: number
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
    numeroAffaire?: boolean
    nomChantier?: boolean
    client?: boolean
    statut?: boolean
    montantTotalHT?: boolean
    margeEstimee?: boolean
    dateCreation?: boolean
    dateDebut?: boolean
    dateFinEstimee?: boolean
    dateFinReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creePar?: boolean | UserDefaultArgs<ExtArgs>
    bdc?: boolean | Affaire$bdcArgs<ExtArgs>
    pointages?: boolean | Affaire$pointagesArgs<ExtArgs>
    _count?: boolean | AffaireCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroAffaire?: boolean
    nomChantier?: boolean
    client?: boolean
    statut?: boolean
    montantTotalHT?: boolean
    margeEstimee?: boolean
    dateCreation?: boolean
    dateDebut?: boolean
    dateFinEstimee?: boolean
    dateFinReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroAffaire?: boolean
    nomChantier?: boolean
    client?: boolean
    statut?: boolean
    montantTotalHT?: boolean
    margeEstimee?: boolean
    dateCreation?: boolean
    dateDebut?: boolean
    dateFinEstimee?: boolean
    dateFinReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affaire"]>

  export type AffaireSelectScalar = {
    id?: boolean
    numeroAffaire?: boolean
    nomChantier?: boolean
    client?: boolean
    statut?: boolean
    montantTotalHT?: boolean
    margeEstimee?: boolean
    dateCreation?: boolean
    dateDebut?: boolean
    dateFinEstimee?: boolean
    dateFinReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffaireOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroAffaire" | "nomChantier" | "client" | "statut" | "montantTotalHT" | "margeEstimee" | "dateCreation" | "dateDebut" | "dateFinEstimee" | "dateFinReelle" | "creeParId" | "createdAt" | "updatedAt", ExtArgs["result"]["affaire"]>
  export type AffaireInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creePar?: boolean | UserDefaultArgs<ExtArgs>
    bdc?: boolean | Affaire$bdcArgs<ExtArgs>
    pointages?: boolean | Affaire$pointagesArgs<ExtArgs>
    _count?: boolean | AffaireCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AffaireIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AffaireIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AffairePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Affaire"
    objects: {
      creePar: Prisma.$UserPayload<ExtArgs>
      bdc: Prisma.$BdcPayload<ExtArgs>[]
      pointages: Prisma.$PointagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numeroAffaire: string
      nomChantier: string
      client: string | null
      statut: string
      montantTotalHT: number | null
      margeEstimee: number | null
      dateCreation: Date
      dateDebut: Date | null
      dateFinEstimee: Date | null
      dateFinReelle: Date | null
      creeParId: number
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
    creePar<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"Affaire", 'Int'>
    readonly numeroAffaire: FieldRef<"Affaire", 'String'>
    readonly nomChantier: FieldRef<"Affaire", 'String'>
    readonly client: FieldRef<"Affaire", 'String'>
    readonly statut: FieldRef<"Affaire", 'String'>
    readonly montantTotalHT: FieldRef<"Affaire", 'Float'>
    readonly margeEstimee: FieldRef<"Affaire", 'Float'>
    readonly dateCreation: FieldRef<"Affaire", 'DateTime'>
    readonly dateDebut: FieldRef<"Affaire", 'DateTime'>
    readonly dateFinEstimee: FieldRef<"Affaire", 'DateTime'>
    readonly dateFinReelle: FieldRef<"Affaire", 'DateTime'>
    readonly creeParId: FieldRef<"Affaire", 'Int'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffaireIncludeUpdateManyAndReturn<ExtArgs> | null
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
    id: number | null
    affaireId: number | null
    montantHT: number | null
    creeParId: number | null
  }

  export type BdcSumAggregateOutputType = {
    id: number | null
    affaireId: number | null
    montantHT: number | null
    creeParId: number | null
  }

  export type BdcMinAggregateOutputType = {
    id: number | null
    numeroBdc: string | null
    affaireId: number | null
    fournisseur: string | null
    description: string | null
    montantHT: number | null
    statut: string | null
    dateCommande: Date | null
    dateLivraisonEstimee: Date | null
    dateLivraisonReelle: Date | null
    creeParId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BdcMaxAggregateOutputType = {
    id: number | null
    numeroBdc: string | null
    affaireId: number | null
    fournisseur: string | null
    description: string | null
    montantHT: number | null
    statut: string | null
    dateCommande: Date | null
    dateLivraisonEstimee: Date | null
    dateLivraisonReelle: Date | null
    creeParId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BdcCountAggregateOutputType = {
    id: number
    numeroBdc: number
    affaireId: number
    fournisseur: number
    description: number
    montantHT: number
    statut: number
    dateCommande: number
    dateLivraisonEstimee: number
    dateLivraisonReelle: number
    creeParId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BdcAvgAggregateInputType = {
    id?: true
    affaireId?: true
    montantHT?: true
    creeParId?: true
  }

  export type BdcSumAggregateInputType = {
    id?: true
    affaireId?: true
    montantHT?: true
    creeParId?: true
  }

  export type BdcMinAggregateInputType = {
    id?: true
    numeroBdc?: true
    affaireId?: true
    fournisseur?: true
    description?: true
    montantHT?: true
    statut?: true
    dateCommande?: true
    dateLivraisonEstimee?: true
    dateLivraisonReelle?: true
    creeParId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BdcMaxAggregateInputType = {
    id?: true
    numeroBdc?: true
    affaireId?: true
    fournisseur?: true
    description?: true
    montantHT?: true
    statut?: true
    dateCommande?: true
    dateLivraisonEstimee?: true
    dateLivraisonReelle?: true
    creeParId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BdcCountAggregateInputType = {
    id?: true
    numeroBdc?: true
    affaireId?: true
    fournisseur?: true
    description?: true
    montantHT?: true
    statut?: true
    dateCommande?: true
    dateLivraisonEstimee?: true
    dateLivraisonReelle?: true
    creeParId?: true
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
    id: number
    numeroBdc: string
    affaireId: number
    fournisseur: string | null
    description: string | null
    montantHT: number | null
    statut: string
    dateCommande: Date
    dateLivraisonEstimee: Date | null
    dateLivraisonReelle: Date | null
    creeParId: number
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
    numeroBdc?: boolean
    affaireId?: boolean
    fournisseur?: boolean
    description?: boolean
    montantHT?: boolean
    statut?: boolean
    dateCommande?: boolean
    dateLivraisonEstimee?: boolean
    dateLivraisonReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroBdc?: boolean
    affaireId?: boolean
    fournisseur?: boolean
    description?: boolean
    montantHT?: boolean
    statut?: boolean
    dateCommande?: boolean
    dateLivraisonEstimee?: boolean
    dateLivraisonReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numeroBdc?: boolean
    affaireId?: boolean
    fournisseur?: boolean
    description?: boolean
    montantHT?: boolean
    statut?: boolean
    dateCommande?: boolean
    dateLivraisonEstimee?: boolean
    dateLivraisonReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bdc"]>

  export type BdcSelectScalar = {
    id?: boolean
    numeroBdc?: boolean
    affaireId?: boolean
    fournisseur?: boolean
    description?: boolean
    montantHT?: boolean
    statut?: boolean
    dateCommande?: boolean
    dateLivraisonEstimee?: boolean
    dateLivraisonReelle?: boolean
    creeParId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BdcOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numeroBdc" | "affaireId" | "fournisseur" | "description" | "montantHT" | "statut" | "dateCommande" | "dateLivraisonEstimee" | "dateLivraisonReelle" | "creeParId" | "createdAt" | "updatedAt", ExtArgs["result"]["bdc"]>
  export type BdcInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BdcIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BdcIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affaire?: boolean | AffaireDefaultArgs<ExtArgs>
    creePar?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BdcPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bdc"
    objects: {
      affaire: Prisma.$AffairePayload<ExtArgs>
      creePar: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numeroBdc: string
      affaireId: number
      fournisseur: string | null
      description: string | null
      montantHT: number | null
      statut: string
      dateCommande: Date
      dateLivraisonEstimee: Date | null
      dateLivraisonReelle: Date | null
      creeParId: number
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
    creePar<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"Bdc", 'Int'>
    readonly numeroBdc: FieldRef<"Bdc", 'String'>
    readonly affaireId: FieldRef<"Bdc", 'Int'>
    readonly fournisseur: FieldRef<"Bdc", 'String'>
    readonly description: FieldRef<"Bdc", 'String'>
    readonly montantHT: FieldRef<"Bdc", 'Float'>
    readonly statut: FieldRef<"Bdc", 'String'>
    readonly dateCommande: FieldRef<"Bdc", 'DateTime'>
    readonly dateLivraisonEstimee: FieldRef<"Bdc", 'DateTime'>
    readonly dateLivraisonReelle: FieldRef<"Bdc", 'DateTime'>
    readonly creeParId: FieldRef<"Bdc", 'Int'>
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
    id: number | null
    utilisateurId: number | null
    affaireId: number | null
    heures: number | null
  }

  export type PointageSumAggregateOutputType = {
    id: number | null
    utilisateurId: number | null
    affaireId: number | null
    heures: number | null
  }

  export type PointageMinAggregateOutputType = {
    id: number | null
    utilisateurId: number | null
    affaireId: number | null
    date: Date | null
    heures: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointageMaxAggregateOutputType = {
    id: number | null
    utilisateurId: number | null
    affaireId: number | null
    date: Date | null
    heures: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointageCountAggregateOutputType = {
    id: number
    utilisateurId: number
    affaireId: number
    date: number
    heures: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PointageAvgAggregateInputType = {
    id?: true
    utilisateurId?: true
    affaireId?: true
    heures?: true
  }

  export type PointageSumAggregateInputType = {
    id?: true
    utilisateurId?: true
    affaireId?: true
    heures?: true
  }

  export type PointageMinAggregateInputType = {
    id?: true
    utilisateurId?: true
    affaireId?: true
    date?: true
    heures?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointageMaxAggregateInputType = {
    id?: true
    utilisateurId?: true
    affaireId?: true
    date?: true
    heures?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointageCountAggregateInputType = {
    id?: true
    utilisateurId?: true
    affaireId?: true
    date?: true
    heures?: true
    description?: true
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
    id: number
    utilisateurId: number
    affaireId: number | null
    date: Date
    heures: number
    description: string | null
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
    utilisateurId?: boolean
    affaireId?: boolean
    date?: boolean
    heures?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateurId?: boolean
    affaireId?: boolean
    date?: boolean
    heures?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    utilisateurId?: boolean
    affaireId?: boolean
    date?: boolean
    heures?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }, ExtArgs["result"]["pointage"]>

  export type PointageSelectScalar = {
    id?: boolean
    utilisateurId?: boolean
    affaireId?: boolean
    date?: boolean
    heures?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PointageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "utilisateurId" | "affaireId" | "date" | "heures" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["pointage"]>
  export type PointageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }
  export type PointageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }
  export type PointageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    affaire?: boolean | Pointage$affaireArgs<ExtArgs>
  }

  export type $PointagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pointage"
    objects: {
      utilisateur: Prisma.$UserPayload<ExtArgs>
      affaire: Prisma.$AffairePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      utilisateurId: number
      affaireId: number | null
      date: Date
      heures: number
      description: string | null
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
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    affaire<T extends Pointage$affaireArgs<ExtArgs> = {}>(args?: Subset<T, Pointage$affaireArgs<ExtArgs>>): Prisma__AffaireClient<$Result.GetResult<Prisma.$AffairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"Pointage", 'Int'>
    readonly utilisateurId: FieldRef<"Pointage", 'Int'>
    readonly affaireId: FieldRef<"Pointage", 'Int'>
    readonly date: FieldRef<"Pointage", 'DateTime'>
    readonly heures: FieldRef<"Pointage", 'Float'>
    readonly description: FieldRef<"Pointage", 'String'>
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
   * Pointage.affaire
   */
  export type Pointage$affaireArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: AffaireWhereInput
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
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _avg: PasswordResetAvgAggregateOutputType | null
    _sum: PasswordResetSumAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetAvgAggregateOutputType = {
    userId: number | null
  }

  export type PasswordResetSumAggregateOutputType = {
    userId: number | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    userId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    userId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    email: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetAvgAggregateInputType = {
    userId?: true
  }

  export type PasswordResetSumAggregateInputType = {
    userId?: true
  }

  export type PasswordResetMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PasswordResetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PasswordResetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _avg?: PasswordResetAvgAggregateInputType
    _sum?: PasswordResetSumAggregateInputType
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    email: string
    token: string
    userId: number
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetCountAggregateOutputType | null
    _avg: PasswordResetAvgAggregateOutputType | null
    _sum: PasswordResetSumAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      userId: number
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResets and returns the data saved in the database.
     * @param {PasswordResetCreateManyAndReturnArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets and returns the data updated in the database.
     * @param {PasswordResetUpdateManyAndReturnArgs} args - Arguments to update many PasswordResets.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordResetUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly email: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly userId: FieldRef<"PasswordReset", 'Int'>
    readonly expiresAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset createManyAndReturn
   */
  export type PasswordResetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset updateManyAndReturn
   */
  export type PasswordResetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nom: 'nom',
    prenom: 'prenom',
    password: 'password',
    role: 'role',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AffaireScalarFieldEnum: {
    id: 'id',
    numeroAffaire: 'numeroAffaire',
    nomChantier: 'nomChantier',
    client: 'client',
    statut: 'statut',
    montantTotalHT: 'montantTotalHT',
    margeEstimee: 'margeEstimee',
    dateCreation: 'dateCreation',
    dateDebut: 'dateDebut',
    dateFinEstimee: 'dateFinEstimee',
    dateFinReelle: 'dateFinReelle',
    creeParId: 'creeParId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffaireScalarFieldEnum = (typeof AffaireScalarFieldEnum)[keyof typeof AffaireScalarFieldEnum]


  export const BdcScalarFieldEnum: {
    id: 'id',
    numeroBdc: 'numeroBdc',
    affaireId: 'affaireId',
    fournisseur: 'fournisseur',
    description: 'description',
    montantHT: 'montantHT',
    statut: 'statut',
    dateCommande: 'dateCommande',
    dateLivraisonEstimee: 'dateLivraisonEstimee',
    dateLivraisonReelle: 'dateLivraisonReelle',
    creeParId: 'creeParId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BdcScalarFieldEnum = (typeof BdcScalarFieldEnum)[keyof typeof BdcScalarFieldEnum]


  export const PointageScalarFieldEnum: {
    id: 'id',
    utilisateurId: 'utilisateurId',
    affaireId: 'affaireId',
    date: 'date',
    heures: 'heures',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PointageScalarFieldEnum = (typeof PointageScalarFieldEnum)[keyof typeof PointageScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    nom?: StringNullableFilter<"User"> | string | null
    prenom?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    affaires?: AffaireListRelationFilter
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
    PasswordReset?: PasswordResetListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrderInput | SortOrder
    prenom?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    affaires?: AffaireOrderByRelationAggregateInput
    bdc?: BdcOrderByRelationAggregateInput
    pointages?: PointageOrderByRelationAggregateInput
    PasswordReset?: PasswordResetOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringNullableFilter<"User"> | string | null
    prenom?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    affaires?: AffaireListRelationFilter
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
    PasswordReset?: PasswordResetListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrderInput | SortOrder
    prenom?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    nom?: StringNullableWithAggregatesFilter<"User"> | string | null
    prenom?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    actif?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AffaireWhereInput = {
    AND?: AffaireWhereInput | AffaireWhereInput[]
    OR?: AffaireWhereInput[]
    NOT?: AffaireWhereInput | AffaireWhereInput[]
    id?: IntFilter<"Affaire"> | number
    numeroAffaire?: StringFilter<"Affaire"> | string
    nomChantier?: StringFilter<"Affaire"> | string
    client?: StringNullableFilter<"Affaire"> | string | null
    statut?: StringFilter<"Affaire"> | string
    montantTotalHT?: FloatNullableFilter<"Affaire"> | number | null
    margeEstimee?: FloatNullableFilter<"Affaire"> | number | null
    dateCreation?: DateTimeFilter<"Affaire"> | Date | string
    dateDebut?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinEstimee?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinReelle?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    creeParId?: IntFilter<"Affaire"> | number
    createdAt?: DateTimeFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeFilter<"Affaire"> | Date | string
    creePar?: XOR<UserScalarRelationFilter, UserWhereInput>
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
  }

  export type AffaireOrderByWithRelationInput = {
    id?: SortOrder
    numeroAffaire?: SortOrder
    nomChantier?: SortOrder
    client?: SortOrderInput | SortOrder
    statut?: SortOrder
    montantTotalHT?: SortOrderInput | SortOrder
    margeEstimee?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    dateDebut?: SortOrderInput | SortOrder
    dateFinEstimee?: SortOrderInput | SortOrder
    dateFinReelle?: SortOrderInput | SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creePar?: UserOrderByWithRelationInput
    bdc?: BdcOrderByRelationAggregateInput
    pointages?: PointageOrderByRelationAggregateInput
  }

  export type AffaireWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    numeroAffaire?: string
    AND?: AffaireWhereInput | AffaireWhereInput[]
    OR?: AffaireWhereInput[]
    NOT?: AffaireWhereInput | AffaireWhereInput[]
    nomChantier?: StringFilter<"Affaire"> | string
    client?: StringNullableFilter<"Affaire"> | string | null
    statut?: StringFilter<"Affaire"> | string
    montantTotalHT?: FloatNullableFilter<"Affaire"> | number | null
    margeEstimee?: FloatNullableFilter<"Affaire"> | number | null
    dateCreation?: DateTimeFilter<"Affaire"> | Date | string
    dateDebut?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinEstimee?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinReelle?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    creeParId?: IntFilter<"Affaire"> | number
    createdAt?: DateTimeFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeFilter<"Affaire"> | Date | string
    creePar?: XOR<UserScalarRelationFilter, UserWhereInput>
    bdc?: BdcListRelationFilter
    pointages?: PointageListRelationFilter
  }, "id" | "numeroAffaire">

  export type AffaireOrderByWithAggregationInput = {
    id?: SortOrder
    numeroAffaire?: SortOrder
    nomChantier?: SortOrder
    client?: SortOrderInput | SortOrder
    statut?: SortOrder
    montantTotalHT?: SortOrderInput | SortOrder
    margeEstimee?: SortOrderInput | SortOrder
    dateCreation?: SortOrder
    dateDebut?: SortOrderInput | SortOrder
    dateFinEstimee?: SortOrderInput | SortOrder
    dateFinReelle?: SortOrderInput | SortOrder
    creeParId?: SortOrder
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
    id?: IntWithAggregatesFilter<"Affaire"> | number
    numeroAffaire?: StringWithAggregatesFilter<"Affaire"> | string
    nomChantier?: StringWithAggregatesFilter<"Affaire"> | string
    client?: StringNullableWithAggregatesFilter<"Affaire"> | string | null
    statut?: StringWithAggregatesFilter<"Affaire"> | string
    montantTotalHT?: FloatNullableWithAggregatesFilter<"Affaire"> | number | null
    margeEstimee?: FloatNullableWithAggregatesFilter<"Affaire"> | number | null
    dateCreation?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
    dateDebut?: DateTimeNullableWithAggregatesFilter<"Affaire"> | Date | string | null
    dateFinEstimee?: DateTimeNullableWithAggregatesFilter<"Affaire"> | Date | string | null
    dateFinReelle?: DateTimeNullableWithAggregatesFilter<"Affaire"> | Date | string | null
    creeParId?: IntWithAggregatesFilter<"Affaire"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Affaire"> | Date | string
  }

  export type BdcWhereInput = {
    AND?: BdcWhereInput | BdcWhereInput[]
    OR?: BdcWhereInput[]
    NOT?: BdcWhereInput | BdcWhereInput[]
    id?: IntFilter<"Bdc"> | number
    numeroBdc?: StringFilter<"Bdc"> | string
    affaireId?: IntFilter<"Bdc"> | number
    fournisseur?: StringNullableFilter<"Bdc"> | string | null
    description?: StringNullableFilter<"Bdc"> | string | null
    montantHT?: FloatNullableFilter<"Bdc"> | number | null
    statut?: StringFilter<"Bdc"> | string
    dateCommande?: DateTimeFilter<"Bdc"> | Date | string
    dateLivraisonEstimee?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    dateLivraisonReelle?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    creeParId?: IntFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    creePar?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BdcOrderByWithRelationInput = {
    id?: SortOrder
    numeroBdc?: SortOrder
    affaireId?: SortOrder
    fournisseur?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    montantHT?: SortOrderInput | SortOrder
    statut?: SortOrder
    dateCommande?: SortOrder
    dateLivraisonEstimee?: SortOrderInput | SortOrder
    dateLivraisonReelle?: SortOrderInput | SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    affaire?: AffaireOrderByWithRelationInput
    creePar?: UserOrderByWithRelationInput
  }

  export type BdcWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    numeroBdc?: string
    AND?: BdcWhereInput | BdcWhereInput[]
    OR?: BdcWhereInput[]
    NOT?: BdcWhereInput | BdcWhereInput[]
    affaireId?: IntFilter<"Bdc"> | number
    fournisseur?: StringNullableFilter<"Bdc"> | string | null
    description?: StringNullableFilter<"Bdc"> | string | null
    montantHT?: FloatNullableFilter<"Bdc"> | number | null
    statut?: StringFilter<"Bdc"> | string
    dateCommande?: DateTimeFilter<"Bdc"> | Date | string
    dateLivraisonEstimee?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    dateLivraisonReelle?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    creeParId?: IntFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
    affaire?: XOR<AffaireScalarRelationFilter, AffaireWhereInput>
    creePar?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "numeroBdc">

  export type BdcOrderByWithAggregationInput = {
    id?: SortOrder
    numeroBdc?: SortOrder
    affaireId?: SortOrder
    fournisseur?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    montantHT?: SortOrderInput | SortOrder
    statut?: SortOrder
    dateCommande?: SortOrder
    dateLivraisonEstimee?: SortOrderInput | SortOrder
    dateLivraisonReelle?: SortOrderInput | SortOrder
    creeParId?: SortOrder
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
    id?: IntWithAggregatesFilter<"Bdc"> | number
    numeroBdc?: StringWithAggregatesFilter<"Bdc"> | string
    affaireId?: IntWithAggregatesFilter<"Bdc"> | number
    fournisseur?: StringNullableWithAggregatesFilter<"Bdc"> | string | null
    description?: StringNullableWithAggregatesFilter<"Bdc"> | string | null
    montantHT?: FloatNullableWithAggregatesFilter<"Bdc"> | number | null
    statut?: StringWithAggregatesFilter<"Bdc"> | string
    dateCommande?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
    dateLivraisonEstimee?: DateTimeNullableWithAggregatesFilter<"Bdc"> | Date | string | null
    dateLivraisonReelle?: DateTimeNullableWithAggregatesFilter<"Bdc"> | Date | string | null
    creeParId?: IntWithAggregatesFilter<"Bdc"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bdc"> | Date | string
  }

  export type PointageWhereInput = {
    AND?: PointageWhereInput | PointageWhereInput[]
    OR?: PointageWhereInput[]
    NOT?: PointageWhereInput | PointageWhereInput[]
    id?: IntFilter<"Pointage"> | number
    utilisateurId?: IntFilter<"Pointage"> | number
    affaireId?: IntNullableFilter<"Pointage"> | number | null
    date?: DateTimeFilter<"Pointage"> | Date | string
    heures?: FloatFilter<"Pointage"> | number
    description?: StringNullableFilter<"Pointage"> | string | null
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    affaire?: XOR<AffaireNullableScalarRelationFilter, AffaireWhereInput> | null
  }

  export type PointageOrderByWithRelationInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrderInput | SortOrder
    date?: SortOrder
    heures?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateur?: UserOrderByWithRelationInput
    affaire?: AffaireOrderByWithRelationInput
  }

  export type PointageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PointageWhereInput | PointageWhereInput[]
    OR?: PointageWhereInput[]
    NOT?: PointageWhereInput | PointageWhereInput[]
    utilisateurId?: IntFilter<"Pointage"> | number
    affaireId?: IntNullableFilter<"Pointage"> | number | null
    date?: DateTimeFilter<"Pointage"> | Date | string
    heures?: FloatFilter<"Pointage"> | number
    description?: StringNullableFilter<"Pointage"> | string | null
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    affaire?: XOR<AffaireNullableScalarRelationFilter, AffaireWhereInput> | null
  }, "id">

  export type PointageOrderByWithAggregationInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrderInput | SortOrder
    date?: SortOrder
    heures?: SortOrder
    description?: SortOrderInput | SortOrder
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
    id?: IntWithAggregatesFilter<"Pointage"> | number
    utilisateurId?: IntWithAggregatesFilter<"Pointage"> | number
    affaireId?: IntNullableWithAggregatesFilter<"Pointage"> | number | null
    date?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
    heures?: FloatWithAggregatesFilter<"Pointage"> | number
    description?: StringNullableWithAggregatesFilter<"Pointage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pointage"> | Date | string
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    email?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    userId?: IntFilter<"PasswordReset"> | number
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    email?: StringFilter<"PasswordReset"> | string
    userId?: IntFilter<"PasswordReset"> | number
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _avg?: PasswordResetAvgOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
    _sum?: PasswordResetSumOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    email?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    userId?: IntWithAggregatesFilter<"PasswordReset"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireCreateNestedManyWithoutCreeParInput
    bdc?: BdcCreateNestedManyWithoutCreeParInput
    pointages?: PointageCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireUncheckedCreateNestedManyWithoutCreeParInput
    bdc?: BdcUncheckedCreateNestedManyWithoutCreeParInput
    pointages?: PointageUncheckedCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUncheckedUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUncheckedUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffaireCreateInput = {
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creePar: UserCreateNestedOneWithoutAffairesInput
    bdc?: BdcCreateNestedManyWithoutAffaireInput
    pointages?: PointageCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutAffaireInput
    pointages?: PointageUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUpdateInput = {
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creePar?: UserUpdateOneRequiredWithoutAffairesNestedInput
    bdc?: BdcUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireCreateManyInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffaireUpdateManyMutationInput = {
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffaireUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcCreateInput = {
    numeroBdc: string
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutBdcInput
    creePar: UserCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateInput = {
    id?: number
    numeroBdc: string
    affaireId: number
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateInput = {
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutBdcNestedInput
    creePar?: UserUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    affaireId?: IntFieldUpdateOperationsInput | number
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcCreateManyInput = {
    id?: number
    numeroBdc: string
    affaireId: number
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateManyMutationInput = {
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    affaireId?: IntFieldUpdateOperationsInput | number
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateInput = {
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutPointagesInput
    affaire?: AffaireCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateInput = {
    id?: number
    utilisateurId: number
    affaireId?: number | null
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutPointagesNestedInput
    affaire?: AffaireUpdateOneWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    utilisateurId?: IntFieldUpdateOperationsInput | number
    affaireId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageCreateManyInput = {
    id?: number
    utilisateurId: number
    affaireId?: number | null
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    utilisateurId?: IntFieldUpdateOperationsInput | number
    affaireId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    userId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    email: string
    token: string
    userId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type AffaireListRelationFilter = {
    every?: AffaireWhereInput
    some?: AffaireWhereInput
    none?: AffaireWhereInput
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

  export type PasswordResetListRelationFilter = {
    every?: PasswordResetWhereInput
    some?: PasswordResetWhereInput
    none?: PasswordResetWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AffaireOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BdcOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PointageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AffaireCountOrderByAggregateInput = {
    id?: SortOrder
    numeroAffaire?: SortOrder
    nomChantier?: SortOrder
    client?: SortOrder
    statut?: SortOrder
    montantTotalHT?: SortOrder
    margeEstimee?: SortOrder
    dateCreation?: SortOrder
    dateDebut?: SortOrder
    dateFinEstimee?: SortOrder
    dateFinReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireAvgOrderByAggregateInput = {
    id?: SortOrder
    montantTotalHT?: SortOrder
    margeEstimee?: SortOrder
    creeParId?: SortOrder
  }

  export type AffaireMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroAffaire?: SortOrder
    nomChantier?: SortOrder
    client?: SortOrder
    statut?: SortOrder
    montantTotalHT?: SortOrder
    margeEstimee?: SortOrder
    dateCreation?: SortOrder
    dateDebut?: SortOrder
    dateFinEstimee?: SortOrder
    dateFinReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireMinOrderByAggregateInput = {
    id?: SortOrder
    numeroAffaire?: SortOrder
    nomChantier?: SortOrder
    client?: SortOrder
    statut?: SortOrder
    montantTotalHT?: SortOrder
    margeEstimee?: SortOrder
    dateCreation?: SortOrder
    dateDebut?: SortOrder
    dateFinEstimee?: SortOrder
    dateFinReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffaireSumOrderByAggregateInput = {
    id?: SortOrder
    montantTotalHT?: SortOrder
    margeEstimee?: SortOrder
    creeParId?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type AffaireScalarRelationFilter = {
    is?: AffaireWhereInput
    isNot?: AffaireWhereInput
  }

  export type BdcCountOrderByAggregateInput = {
    id?: SortOrder
    numeroBdc?: SortOrder
    affaireId?: SortOrder
    fournisseur?: SortOrder
    description?: SortOrder
    montantHT?: SortOrder
    statut?: SortOrder
    dateCommande?: SortOrder
    dateLivraisonEstimee?: SortOrder
    dateLivraisonReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcAvgOrderByAggregateInput = {
    id?: SortOrder
    affaireId?: SortOrder
    montantHT?: SortOrder
    creeParId?: SortOrder
  }

  export type BdcMaxOrderByAggregateInput = {
    id?: SortOrder
    numeroBdc?: SortOrder
    affaireId?: SortOrder
    fournisseur?: SortOrder
    description?: SortOrder
    montantHT?: SortOrder
    statut?: SortOrder
    dateCommande?: SortOrder
    dateLivraisonEstimee?: SortOrder
    dateLivraisonReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcMinOrderByAggregateInput = {
    id?: SortOrder
    numeroBdc?: SortOrder
    affaireId?: SortOrder
    fournisseur?: SortOrder
    description?: SortOrder
    montantHT?: SortOrder
    statut?: SortOrder
    dateCommande?: SortOrder
    dateLivraisonEstimee?: SortOrder
    dateLivraisonReelle?: SortOrder
    creeParId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BdcSumOrderByAggregateInput = {
    id?: SortOrder
    affaireId?: SortOrder
    montantHT?: SortOrder
    creeParId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type AffaireNullableScalarRelationFilter = {
    is?: AffaireWhereInput | null
    isNot?: AffaireWhereInput | null
  }

  export type PointageCountOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrder
    date?: SortOrder
    heures?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageAvgOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrder
    heures?: SortOrder
  }

  export type PointageMaxOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrder
    date?: SortOrder
    heures?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageMinOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrder
    date?: SortOrder
    heures?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointageSumOrderByAggregateInput = {
    id?: SortOrder
    utilisateurId?: SortOrder
    affaireId?: SortOrder
    heures?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type AffaireCreateNestedManyWithoutCreeParInput = {
    create?: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput> | AffaireCreateWithoutCreeParInput[] | AffaireUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: AffaireCreateOrConnectWithoutCreeParInput | AffaireCreateOrConnectWithoutCreeParInput[]
    createMany?: AffaireCreateManyCreeParInputEnvelope
    connect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
  }

  export type BdcCreateNestedManyWithoutCreeParInput = {
    create?: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput> | BdcCreateWithoutCreeParInput[] | BdcUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCreeParInput | BdcCreateOrConnectWithoutCreeParInput[]
    createMany?: BdcCreateManyCreeParInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type PointageCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput> | PointageCreateWithoutUtilisateurInput[] | PointageUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUtilisateurInput | PointageCreateOrConnectWithoutUtilisateurInput[]
    createMany?: PointageCreateManyUtilisateurInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type PasswordResetCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type AffaireUncheckedCreateNestedManyWithoutCreeParInput = {
    create?: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput> | AffaireCreateWithoutCreeParInput[] | AffaireUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: AffaireCreateOrConnectWithoutCreeParInput | AffaireCreateOrConnectWithoutCreeParInput[]
    createMany?: AffaireCreateManyCreeParInputEnvelope
    connect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
  }

  export type BdcUncheckedCreateNestedManyWithoutCreeParInput = {
    create?: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput> | BdcCreateWithoutCreeParInput[] | BdcUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCreeParInput | BdcCreateOrConnectWithoutCreeParInput[]
    createMany?: BdcCreateManyCreeParInputEnvelope
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
  }

  export type PointageUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput> | PointageCreateWithoutUtilisateurInput[] | PointageUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUtilisateurInput | PointageCreateOrConnectWithoutUtilisateurInput[]
    createMany?: PointageCreateManyUtilisateurInputEnvelope
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
  }

  export type PasswordResetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AffaireUpdateManyWithoutCreeParNestedInput = {
    create?: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput> | AffaireCreateWithoutCreeParInput[] | AffaireUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: AffaireCreateOrConnectWithoutCreeParInput | AffaireCreateOrConnectWithoutCreeParInput[]
    upsert?: AffaireUpsertWithWhereUniqueWithoutCreeParInput | AffaireUpsertWithWhereUniqueWithoutCreeParInput[]
    createMany?: AffaireCreateManyCreeParInputEnvelope
    set?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    disconnect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    delete?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    connect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    update?: AffaireUpdateWithWhereUniqueWithoutCreeParInput | AffaireUpdateWithWhereUniqueWithoutCreeParInput[]
    updateMany?: AffaireUpdateManyWithWhereWithoutCreeParInput | AffaireUpdateManyWithWhereWithoutCreeParInput[]
    deleteMany?: AffaireScalarWhereInput | AffaireScalarWhereInput[]
  }

  export type BdcUpdateManyWithoutCreeParNestedInput = {
    create?: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput> | BdcCreateWithoutCreeParInput[] | BdcUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCreeParInput | BdcCreateOrConnectWithoutCreeParInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutCreeParInput | BdcUpsertWithWhereUniqueWithoutCreeParInput[]
    createMany?: BdcCreateManyCreeParInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutCreeParInput | BdcUpdateWithWhereUniqueWithoutCreeParInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutCreeParInput | BdcUpdateManyWithWhereWithoutCreeParInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type PointageUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput> | PointageCreateWithoutUtilisateurInput[] | PointageUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUtilisateurInput | PointageCreateOrConnectWithoutUtilisateurInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutUtilisateurInput | PointageUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: PointageCreateManyUtilisateurInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutUtilisateurInput | PointageUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutUtilisateurInput | PointageUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type PasswordResetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AffaireUncheckedUpdateManyWithoutCreeParNestedInput = {
    create?: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput> | AffaireCreateWithoutCreeParInput[] | AffaireUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: AffaireCreateOrConnectWithoutCreeParInput | AffaireCreateOrConnectWithoutCreeParInput[]
    upsert?: AffaireUpsertWithWhereUniqueWithoutCreeParInput | AffaireUpsertWithWhereUniqueWithoutCreeParInput[]
    createMany?: AffaireCreateManyCreeParInputEnvelope
    set?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    disconnect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    delete?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    connect?: AffaireWhereUniqueInput | AffaireWhereUniqueInput[]
    update?: AffaireUpdateWithWhereUniqueWithoutCreeParInput | AffaireUpdateWithWhereUniqueWithoutCreeParInput[]
    updateMany?: AffaireUpdateManyWithWhereWithoutCreeParInput | AffaireUpdateManyWithWhereWithoutCreeParInput[]
    deleteMany?: AffaireScalarWhereInput | AffaireScalarWhereInput[]
  }

  export type BdcUncheckedUpdateManyWithoutCreeParNestedInput = {
    create?: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput> | BdcCreateWithoutCreeParInput[] | BdcUncheckedCreateWithoutCreeParInput[]
    connectOrCreate?: BdcCreateOrConnectWithoutCreeParInput | BdcCreateOrConnectWithoutCreeParInput[]
    upsert?: BdcUpsertWithWhereUniqueWithoutCreeParInput | BdcUpsertWithWhereUniqueWithoutCreeParInput[]
    createMany?: BdcCreateManyCreeParInputEnvelope
    set?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    disconnect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    delete?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    connect?: BdcWhereUniqueInput | BdcWhereUniqueInput[]
    update?: BdcUpdateWithWhereUniqueWithoutCreeParInput | BdcUpdateWithWhereUniqueWithoutCreeParInput[]
    updateMany?: BdcUpdateManyWithWhereWithoutCreeParInput | BdcUpdateManyWithWhereWithoutCreeParInput[]
    deleteMany?: BdcScalarWhereInput | BdcScalarWhereInput[]
  }

  export type PointageUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput> | PointageCreateWithoutUtilisateurInput[] | PointageUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: PointageCreateOrConnectWithoutUtilisateurInput | PointageCreateOrConnectWithoutUtilisateurInput[]
    upsert?: PointageUpsertWithWhereUniqueWithoutUtilisateurInput | PointageUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: PointageCreateManyUtilisateurInputEnvelope
    set?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    disconnect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    delete?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    connect?: PointageWhereUniqueInput | PointageWhereUniqueInput[]
    update?: PointageUpdateWithWhereUniqueWithoutUtilisateurInput | PointageUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: PointageUpdateManyWithWhereWithoutUtilisateurInput | PointageUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: PointageScalarWhereInput | PointageScalarWhereInput[]
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAffairesInput = {
    create?: XOR<UserCreateWithoutAffairesInput, UserUncheckedCreateWithoutAffairesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffairesInput
    connect?: UserWhereUniqueInput
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

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAffairesNestedInput = {
    create?: XOR<UserCreateWithoutAffairesInput, UserUncheckedCreateWithoutAffairesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffairesInput
    upsert?: UserUpsertWithoutAffairesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffairesInput, UserUpdateWithoutAffairesInput>, UserUncheckedUpdateWithoutAffairesInput>
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

  export type AffaireCreateNestedOneWithoutBdcInput = {
    create?: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutBdcInput
    connect?: AffaireWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBdcInput = {
    create?: XOR<UserCreateWithoutBdcInput, UserUncheckedCreateWithoutBdcInput>
    connectOrCreate?: UserCreateOrConnectWithoutBdcInput
    connect?: UserWhereUniqueInput
  }

  export type AffaireUpdateOneRequiredWithoutBdcNestedInput = {
    create?: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutBdcInput
    upsert?: AffaireUpsertWithoutBdcInput
    connect?: AffaireWhereUniqueInput
    update?: XOR<XOR<AffaireUpdateToOneWithWhereWithoutBdcInput, AffaireUpdateWithoutBdcInput>, AffaireUncheckedUpdateWithoutBdcInput>
  }

  export type UserUpdateOneRequiredWithoutBdcNestedInput = {
    create?: XOR<UserCreateWithoutBdcInput, UserUncheckedCreateWithoutBdcInput>
    connectOrCreate?: UserCreateOrConnectWithoutBdcInput
    upsert?: UserUpsertWithoutBdcInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBdcInput, UserUpdateWithoutBdcInput>, UserUncheckedUpdateWithoutBdcInput>
  }

  export type UserCreateNestedOneWithoutPointagesInput = {
    create?: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointagesInput
    connect?: UserWhereUniqueInput
  }

  export type AffaireCreateNestedOneWithoutPointagesInput = {
    create?: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutPointagesInput
    connect?: AffaireWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPointagesNestedInput = {
    create?: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointagesInput
    upsert?: UserUpsertWithoutPointagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPointagesInput, UserUpdateWithoutPointagesInput>, UserUncheckedUpdateWithoutPointagesInput>
  }

  export type AffaireUpdateOneWithoutPointagesNestedInput = {
    create?: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
    connectOrCreate?: AffaireCreateOrConnectWithoutPointagesInput
    upsert?: AffaireUpsertWithoutPointagesInput
    disconnect?: AffaireWhereInput | boolean
    delete?: AffaireWhereInput | boolean
    connect?: AffaireWhereUniqueInput
    update?: XOR<XOR<AffaireUpdateToOneWithWhereWithoutPointagesInput, AffaireUpdateWithoutPointagesInput>, AffaireUncheckedUpdateWithoutPointagesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutPasswordResetInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    upsert?: UserUpsertWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetInput, UserUpdateWithoutPasswordResetInput>, UserUncheckedUpdateWithoutPasswordResetInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type AffaireCreateWithoutCreeParInput = {
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcCreateNestedManyWithoutAffaireInput
    pointages?: PointageCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateWithoutCreeParInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutAffaireInput
    pointages?: PointageUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireCreateOrConnectWithoutCreeParInput = {
    where: AffaireWhereUniqueInput
    create: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput>
  }

  export type AffaireCreateManyCreeParInputEnvelope = {
    data: AffaireCreateManyCreeParInput | AffaireCreateManyCreeParInput[]
    skipDuplicates?: boolean
  }

  export type BdcCreateWithoutCreeParInput = {
    numeroBdc: string
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire: AffaireCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateWithoutCreeParInput = {
    id?: number
    numeroBdc: string
    affaireId: number
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcCreateOrConnectWithoutCreeParInput = {
    where: BdcWhereUniqueInput
    create: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput>
  }

  export type BdcCreateManyCreeParInputEnvelope = {
    data: BdcCreateManyCreeParInput | BdcCreateManyCreeParInput[]
    skipDuplicates?: boolean
  }

  export type PointageCreateWithoutUtilisateurInput = {
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affaire?: AffaireCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateWithoutUtilisateurInput = {
    id?: number
    affaireId?: number | null
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateOrConnectWithoutUtilisateurInput = {
    where: PointageWhereUniqueInput
    create: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput>
  }

  export type PointageCreateManyUtilisateurInputEnvelope = {
    data: PointageCreateManyUtilisateurInput | PointageCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetCreateWithoutUserInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUncheckedCreateWithoutUserInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetCreateOrConnectWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetCreateManyUserInputEnvelope = {
    data: PasswordResetCreateManyUserInput | PasswordResetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AffaireUpsertWithWhereUniqueWithoutCreeParInput = {
    where: AffaireWhereUniqueInput
    update: XOR<AffaireUpdateWithoutCreeParInput, AffaireUncheckedUpdateWithoutCreeParInput>
    create: XOR<AffaireCreateWithoutCreeParInput, AffaireUncheckedCreateWithoutCreeParInput>
  }

  export type AffaireUpdateWithWhereUniqueWithoutCreeParInput = {
    where: AffaireWhereUniqueInput
    data: XOR<AffaireUpdateWithoutCreeParInput, AffaireUncheckedUpdateWithoutCreeParInput>
  }

  export type AffaireUpdateManyWithWhereWithoutCreeParInput = {
    where: AffaireScalarWhereInput
    data: XOR<AffaireUpdateManyMutationInput, AffaireUncheckedUpdateManyWithoutCreeParInput>
  }

  export type AffaireScalarWhereInput = {
    AND?: AffaireScalarWhereInput | AffaireScalarWhereInput[]
    OR?: AffaireScalarWhereInput[]
    NOT?: AffaireScalarWhereInput | AffaireScalarWhereInput[]
    id?: IntFilter<"Affaire"> | number
    numeroAffaire?: StringFilter<"Affaire"> | string
    nomChantier?: StringFilter<"Affaire"> | string
    client?: StringNullableFilter<"Affaire"> | string | null
    statut?: StringFilter<"Affaire"> | string
    montantTotalHT?: FloatNullableFilter<"Affaire"> | number | null
    margeEstimee?: FloatNullableFilter<"Affaire"> | number | null
    dateCreation?: DateTimeFilter<"Affaire"> | Date | string
    dateDebut?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinEstimee?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    dateFinReelle?: DateTimeNullableFilter<"Affaire"> | Date | string | null
    creeParId?: IntFilter<"Affaire"> | number
    createdAt?: DateTimeFilter<"Affaire"> | Date | string
    updatedAt?: DateTimeFilter<"Affaire"> | Date | string
  }

  export type BdcUpsertWithWhereUniqueWithoutCreeParInput = {
    where: BdcWhereUniqueInput
    update: XOR<BdcUpdateWithoutCreeParInput, BdcUncheckedUpdateWithoutCreeParInput>
    create: XOR<BdcCreateWithoutCreeParInput, BdcUncheckedCreateWithoutCreeParInput>
  }

  export type BdcUpdateWithWhereUniqueWithoutCreeParInput = {
    where: BdcWhereUniqueInput
    data: XOR<BdcUpdateWithoutCreeParInput, BdcUncheckedUpdateWithoutCreeParInput>
  }

  export type BdcUpdateManyWithWhereWithoutCreeParInput = {
    where: BdcScalarWhereInput
    data: XOR<BdcUpdateManyMutationInput, BdcUncheckedUpdateManyWithoutCreeParInput>
  }

  export type BdcScalarWhereInput = {
    AND?: BdcScalarWhereInput | BdcScalarWhereInput[]
    OR?: BdcScalarWhereInput[]
    NOT?: BdcScalarWhereInput | BdcScalarWhereInput[]
    id?: IntFilter<"Bdc"> | number
    numeroBdc?: StringFilter<"Bdc"> | string
    affaireId?: IntFilter<"Bdc"> | number
    fournisseur?: StringNullableFilter<"Bdc"> | string | null
    description?: StringNullableFilter<"Bdc"> | string | null
    montantHT?: FloatNullableFilter<"Bdc"> | number | null
    statut?: StringFilter<"Bdc"> | string
    dateCommande?: DateTimeFilter<"Bdc"> | Date | string
    dateLivraisonEstimee?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    dateLivraisonReelle?: DateTimeNullableFilter<"Bdc"> | Date | string | null
    creeParId?: IntFilter<"Bdc"> | number
    createdAt?: DateTimeFilter<"Bdc"> | Date | string
    updatedAt?: DateTimeFilter<"Bdc"> | Date | string
  }

  export type PointageUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: PointageWhereUniqueInput
    update: XOR<PointageUpdateWithoutUtilisateurInput, PointageUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<PointageCreateWithoutUtilisateurInput, PointageUncheckedCreateWithoutUtilisateurInput>
  }

  export type PointageUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: PointageWhereUniqueInput
    data: XOR<PointageUpdateWithoutUtilisateurInput, PointageUncheckedUpdateWithoutUtilisateurInput>
  }

  export type PointageUpdateManyWithWhereWithoutUtilisateurInput = {
    where: PointageScalarWhereInput
    data: XOR<PointageUpdateManyMutationInput, PointageUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type PointageScalarWhereInput = {
    AND?: PointageScalarWhereInput | PointageScalarWhereInput[]
    OR?: PointageScalarWhereInput[]
    NOT?: PointageScalarWhereInput | PointageScalarWhereInput[]
    id?: IntFilter<"Pointage"> | number
    utilisateurId?: IntFilter<"Pointage"> | number
    affaireId?: IntNullableFilter<"Pointage"> | number | null
    date?: DateTimeFilter<"Pointage"> | Date | string
    heures?: FloatFilter<"Pointage"> | number
    description?: StringNullableFilter<"Pointage"> | string | null
    createdAt?: DateTimeFilter<"Pointage"> | Date | string
    updatedAt?: DateTimeFilter<"Pointage"> | Date | string
  }

  export type PasswordResetUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    update: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    data: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetScalarWhereInput
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetScalarWhereInput = {
    AND?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    OR?: PasswordResetScalarWhereInput[]
    NOT?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    email?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    userId?: IntFilter<"PasswordReset"> | number
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }

  export type UserCreateWithoutAffairesInput = {
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcCreateNestedManyWithoutCreeParInput
    pointages?: PointageCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAffairesInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutCreeParInput
    pointages?: PointageUncheckedCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAffairesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffairesInput, UserUncheckedCreateWithoutAffairesInput>
  }

  export type BdcCreateWithoutAffaireInput = {
    numeroBdc: string
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creePar: UserCreateNestedOneWithoutBdcInput
  }

  export type BdcUncheckedCreateWithoutAffaireInput = {
    id?: number
    numeroBdc: string
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    creeParId: number
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
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutPointagesInput
  }

  export type PointageUncheckedCreateWithoutAffaireInput = {
    id?: number
    utilisateurId: number
    date: Date | string
    heures: number
    description?: string | null
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

  export type UserUpsertWithoutAffairesInput = {
    update: XOR<UserUpdateWithoutAffairesInput, UserUncheckedUpdateWithoutAffairesInput>
    create: XOR<UserCreateWithoutAffairesInput, UserUncheckedCreateWithoutAffairesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffairesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffairesInput, UserUncheckedUpdateWithoutAffairesInput>
  }

  export type UserUpdateWithoutAffairesInput = {
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAffairesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
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

  export type AffaireCreateWithoutBdcInput = {
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creePar: UserCreateNestedOneWithoutAffairesInput
    pointages?: PointageCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateWithoutBdcInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pointages?: PointageUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireCreateOrConnectWithoutBdcInput = {
    where: AffaireWhereUniqueInput
    create: XOR<AffaireCreateWithoutBdcInput, AffaireUncheckedCreateWithoutBdcInput>
  }

  export type UserCreateWithoutBdcInput = {
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireCreateNestedManyWithoutCreeParInput
    pointages?: PointageCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBdcInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireUncheckedCreateNestedManyWithoutCreeParInput
    pointages?: PointageUncheckedCreateNestedManyWithoutUtilisateurInput
    PasswordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBdcInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBdcInput, UserUncheckedCreateWithoutBdcInput>
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
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creePar?: UserUpdateOneRequiredWithoutAffairesNestedInput
    pointages?: PointageUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateWithoutBdcInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointages?: PointageUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type UserUpsertWithoutBdcInput = {
    update: XOR<UserUpdateWithoutBdcInput, UserUncheckedUpdateWithoutBdcInput>
    create: XOR<UserCreateWithoutBdcInput, UserUncheckedCreateWithoutBdcInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBdcInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBdcInput, UserUncheckedUpdateWithoutBdcInput>
  }

  export type UserUpdateWithoutBdcInput = {
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBdcInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUncheckedUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutUtilisateurNestedInput
    PasswordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPointagesInput = {
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireCreateNestedManyWithoutCreeParInput
    bdc?: BdcCreateNestedManyWithoutCreeParInput
    PasswordReset?: PasswordResetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPointagesInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireUncheckedCreateNestedManyWithoutCreeParInput
    bdc?: BdcUncheckedCreateNestedManyWithoutCreeParInput
    PasswordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPointagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPointagesInput, UserUncheckedCreateWithoutPointagesInput>
  }

  export type AffaireCreateWithoutPointagesInput = {
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creePar: UserCreateNestedOneWithoutAffairesInput
    bdc?: BdcCreateNestedManyWithoutAffaireInput
  }

  export type AffaireUncheckedCreateWithoutPointagesInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bdc?: BdcUncheckedCreateNestedManyWithoutAffaireInput
  }

  export type AffaireCreateOrConnectWithoutPointagesInput = {
    where: AffaireWhereUniqueInput
    create: XOR<AffaireCreateWithoutPointagesInput, AffaireUncheckedCreateWithoutPointagesInput>
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
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUpdateManyWithoutCreeParNestedInput
    PasswordReset?: PasswordResetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPointagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUncheckedUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUncheckedUpdateManyWithoutCreeParNestedInput
    PasswordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
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
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creePar?: UserUpdateOneRequiredWithoutAffairesNestedInput
    bdc?: BdcUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateWithoutPointagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type UserCreateWithoutPasswordResetInput = {
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireCreateNestedManyWithoutCreeParInput
    bdc?: BdcCreateNestedManyWithoutCreeParInput
    pointages?: PointageCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutPasswordResetInput = {
    id?: number
    email: string
    nom?: string | null
    prenom?: string | null
    password: string
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    affaires?: AffaireUncheckedCreateNestedManyWithoutCreeParInput
    bdc?: BdcUncheckedCreateNestedManyWithoutCreeParInput
    pointages?: PointageUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutPasswordResetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
  }

  export type UserUpsertWithoutPasswordResetInput = {
    update: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserUpdateWithoutPasswordResetInput = {
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaires?: AffaireUncheckedUpdateManyWithoutCreeParNestedInput
    bdc?: BdcUncheckedUpdateManyWithoutCreeParNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type AffaireCreateManyCreeParInput = {
    id?: number
    numeroAffaire: string
    nomChantier: string
    client?: string | null
    statut?: string
    montantTotalHT?: number | null
    margeEstimee?: number | null
    dateCreation?: Date | string
    dateDebut?: Date | string | null
    dateFinEstimee?: Date | string | null
    dateFinReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcCreateManyCreeParInput = {
    id?: number
    numeroBdc: string
    affaireId: number
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateManyUtilisateurInput = {
    id?: number
    affaireId?: number | null
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetCreateManyUserInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type AffaireUpdateWithoutCreeParInput = {
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateWithoutCreeParInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bdc?: BdcUncheckedUpdateManyWithoutAffaireNestedInput
    pointages?: PointageUncheckedUpdateManyWithoutAffaireNestedInput
  }

  export type AffaireUncheckedUpdateManyWithoutCreeParInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroAffaire?: StringFieldUpdateOperationsInput | string
    nomChantier?: StringFieldUpdateOperationsInput | string
    client?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: StringFieldUpdateOperationsInput | string
    montantTotalHT?: NullableFloatFieldUpdateOperationsInput | number | null
    margeEstimee?: NullableFloatFieldUpdateOperationsInput | number | null
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateDebut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateFinReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUpdateWithoutCreeParInput = {
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateWithoutCreeParInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    affaireId?: IntFieldUpdateOperationsInput | number
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyWithoutCreeParInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    affaireId?: IntFieldUpdateOperationsInput | number
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUpdateWithoutUtilisateurInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affaire?: AffaireUpdateOneWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateWithoutUtilisateurInput = {
    id?: IntFieldUpdateOperationsInput | number
    affaireId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: IntFieldUpdateOperationsInput | number
    affaireId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcCreateManyAffaireInput = {
    id?: number
    numeroBdc: string
    fournisseur?: string | null
    description?: string | null
    montantHT?: number | null
    statut?: string
    dateCommande?: Date | string
    dateLivraisonEstimee?: Date | string | null
    dateLivraisonReelle?: Date | string | null
    creeParId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointageCreateManyAffaireInput = {
    id?: number
    utilisateurId: number
    date: Date | string
    heures: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BdcUpdateWithoutAffaireInput = {
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creePar?: UserUpdateOneRequiredWithoutBdcNestedInput
  }

  export type BdcUncheckedUpdateWithoutAffaireInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BdcUncheckedUpdateManyWithoutAffaireInput = {
    id?: IntFieldUpdateOperationsInput | number
    numeroBdc?: StringFieldUpdateOperationsInput | string
    fournisseur?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    montantHT?: NullableFloatFieldUpdateOperationsInput | number | null
    statut?: StringFieldUpdateOperationsInput | string
    dateCommande?: DateTimeFieldUpdateOperationsInput | Date | string
    dateLivraisonEstimee?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateLivraisonReelle?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creeParId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUpdateWithoutAffaireInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutPointagesNestedInput
  }

  export type PointageUncheckedUpdateWithoutAffaireInput = {
    id?: IntFieldUpdateOperationsInput | number
    utilisateurId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointageUncheckedUpdateManyWithoutAffaireInput = {
    id?: IntFieldUpdateOperationsInput | number
    utilisateurId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    heures?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
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